type GhlContact = {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  tags?: string[];
  source?: string;
  dateAdded?: string;
  createdAt?: string;
};

type GhlOpportunity = {
  id?: string;
  name?: string;
  status?: string;
  monetaryValue?: number;
  pipelineStageId?: string;
  contactId?: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AppLead = {
  id: string;
  name: string;
  detail: string;
  status: string;
  score: number;
};

export type AppPipelineItem = {
  title: string;
  value: string;
  detail: string;
};

export type AppDashboardData = {
  configured: boolean;
  error?: string;
  contacts: AppLead[];
  opportunities: AppLead[];
  pipeline: AppPipelineItem[];
  stats: {
    leads: number;
    opportunities: number;
    won: number;
  };
};

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function getConfig() {
  return {
    token: process.env.GHL_PRIVATE_INTEGRATION_TOKEN,
    locationId: process.env.GHL_LOCATION_ID,
  };
}

async function ghlGet<T>(path: string, searchParams: Record<string, string>) {
  const { token } = getConfig();
  const url = new URL(`${GHL_BASE_URL}${path}`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GHL ${path} failed with ${response.status}: ${text}`);
  }

  return (await response.json()) as T;
}

function leadScore(contact: GhlContact) {
  const tags = contact.tags ?? [];
  let score = 50;
  if (contact.phone) score += 15;
  if (contact.email) score += 10;
  if (contact.city) score += 10;
  if (tags.length) score += Math.min(tags.length * 4, 15);
  return Math.min(score, 98);
}

function contactName(contact: GhlContact) {
  return (
    contact.name ||
    [contact.firstName, contact.lastName].filter(Boolean).join(" ") ||
    contact.email ||
    contact.phone ||
    "Kontakt bez jména"
  );
}

function contactDetail(contact: GhlContact) {
  const parts = [
    contact.phone,
    contact.email,
    contact.city,
    contact.tags?.slice(0, 2).join(", "),
  ].filter(Boolean);

  return parts.join(" · ") || "Bez doplněných detailů";
}

function opportunityScore(opportunity: GhlOpportunity) {
  let score = 58;
  if (opportunity.status === "won") score = 96;
  if (opportunity.status === "open") score = 82;
  if (opportunity.monetaryValue) score += 8;
  return Math.min(score, 99);
}

function toPipeline(opportunities: GhlOpportunity[]): AppPipelineItem[] {
  const groups = opportunities.reduce<Record<string, number>>((acc, opportunity) => {
    const key = opportunity.status || "unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return [
    {
      title: "Open",
      value: String(groups.open ?? 0),
      detail: "aktivní opportunities",
    },
    {
      title: "Won",
      value: String(groups.won ?? 0),
      detail: "vyhrané zakázky",
    },
    {
      title: "Lost",
      value: String(groups.lost ?? 0),
      detail: "ztracené zakázky",
    },
    {
      title: "Ostatní",
      value: String(
        Object.entries(groups)
          .filter(([key]) => !["open", "won", "lost"].includes(key))
          .reduce((sum, [, count]) => sum + count, 0),
      ),
      detail: "jiné stavy",
    },
  ];
}

export async function getDashboardData(): Promise<AppDashboardData> {
  const { token, locationId } = getConfig();

  if (!token || !locationId) {
    return {
      configured: false,
      error: !token
        ? "Chybí GHL_PRIVATE_INTEGRATION_TOKEN."
        : "Chybí GHL_LOCATION_ID. PIT token nestačí k bezpečnému určení subaccountu.",
      contacts: [],
      opportunities: [],
      pipeline: [],
      stats: { leads: 0, opportunities: 0, won: 0 },
    };
  }

  try {
    const [contactsResponse, opportunitiesResponse] = await Promise.all([
      ghlGet<{ contacts?: GhlContact[] }>("/contacts/", {
        locationId,
        limit: "20",
      }),
      ghlGet<{ opportunities?: GhlOpportunity[] }>("/opportunities/search", {
        location_id: locationId,
        limit: "20",
      }),
    ]);

    const contacts = contactsResponse.contacts ?? [];
    const opportunities = opportunitiesResponse.opportunities ?? [];

    return {
      configured: true,
      contacts: contacts.slice(0, 6).map((contact) => ({
        id: contact.id ?? contactName(contact),
        name: contactName(contact),
        detail: contactDetail(contact),
        status: contact.source || "Kontakt z GHL",
        score: leadScore(contact),
      })),
      opportunities: opportunities.slice(0, 6).map((opportunity) => ({
        id: opportunity.id ?? opportunity.name ?? "opportunity",
        name: opportunity.name || "Opportunity bez názvu",
        detail: opportunity.source || opportunity.pipelineStageId || "GHL opportunity",
        status: opportunity.status || "unknown",
        score: opportunityScore(opportunity),
      })),
      pipeline: toPipeline(opportunities),
      stats: {
        leads: contacts.length,
        opportunities: opportunities.length,
        won: opportunities.filter((opportunity) => opportunity.status === "won")
          .length,
      },
    };
  } catch (error) {
    return {
      configured: true,
      error: error instanceof Error ? error.message : "GHL request failed.",
      contacts: [],
      opportunities: [],
      pipeline: [],
      stats: { leads: 0, opportunities: 0, won: 0 },
    };
  }
}
