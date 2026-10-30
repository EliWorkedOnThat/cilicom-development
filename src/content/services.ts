export type Service = {
  id: string;
  title: string;
  short: string;
  long: string;
  examples: string[];
};

export const services: Service[] = [
  {
    id: "menaxhim",
    title: "Sisteme menaxhimi",
    short: "Një vend i vetëm për stokun, klientët, faturat dhe stafin.",
    long: "ERP, CRM dhe sisteme të brendshme të ndërtuara rreth mënyrës si punon biznesi juaj, jo e kundërta. Të dhëna të qarta, role dhe leje, raporte që i kuptoni menjëherë.",
    examples: ["Inventar & magazinë", "CRM", "Faturim", "Rezervime", "Panele raportimi"],
  },
  {
    id: "automatizim",
    title: "Automatizim",
    short: "Punët e përsëritura i bën sistemi, ju merreni me biznesin.",
    long: "Lidhim mjetet që përdorni tashmë, eliminojmë kopjimin manual të të dhënave dhe ndërtojmë procese që punojnë vetë, 24 orë në ditë.",
    examples: ["Integrime API", "Raporte automatike", "Njoftime", "Sinkronizim të dhënash", "Procese miratimi"],
  },
  {
    id: "web",
    title: "Aplikacione web",
    short: "Platforma të shpejta, të sigurta dhe të bukura në çdo ekran.",
    long: "Portale klientësh, platforma SaaS, dashboard-e dhe faqe që konvertojnë. Të ndërtuara me teknologji moderne që shkallëzohet bashkë me ju.",
    examples: ["Portale klientësh", "SaaS", "Dashboard-e", "E-commerce", "Faqe interneti"],
  },
  {
    id: "ai",
    title: "Zgjidhje AI & LLM",
    short: "Inteligjencë artificiale që punon me të dhënat tuaja.",
    long: "Asistentë që njohin dokumentet tuaja, chatbot-e për klientët, nxjerrje automatike të të dhënave nga faturat dhe kontratat, dhe agjentë që kryejnë detyra reale.",
    examples: ["Asistentë mbi dokumente", "Chatbot-e", "Nxjerrje të dhënash", "Agjentë AI", "Klasifikim"],
  },
  {
    id: "personalizuar",
    title: "Aplikacione të personalizuara",
    short: "Kur asnjë program i gatshëm nuk ju shkon për shtat.",
    long: "Aplikacione web, desktop ose mobile të projektuara posaçërisht për një problem të vetëm, tuajin. Pa licenca të panevojshme, pa kompromise.",
    examples: ["Web", "Mobile", "Desktop", "Mjete të brendshme"],
  },
  {
    id: "ide",
    title: "Nga ideja te produkti",
    short: "Keni një ide? E kthejmë në produkt që funksionon.",
    long: "Fillojmë me një bisedë, e kthejmë në prototip që e prekni, pastaj në një version të parë (MVP) që mund ta vendosni para klientëve të vërtetë.",
    examples: ["Workshop ideje", "Prototip", "MVP", "Lançim"],
  },
  {
    id: "dixhital",
    title: "Zgjidhje dixhitale",
    short: "Nga Excel-i dhe letrat te një sistem i vërtetë.",
    long: "E çojmë biznesin tuaj nga skedarët e shpërndarë dhe puna me dorë te mjete dixhitale të thjeshta, me trajnim për ekipin tuaj.",
    examples: ["Dixhitalizim procesesh", "Migrim të dhënash", "Trajnim", "Konsulencë"],
  },
  {
    id: "mirembajtje",
    title: "Mirëmbajtje & suport",
    short: "Pas lançimit nuk zhdukemi.",
    long: "Monitorim, përditësime sigurie, rregullime dhe përmirësime të vazhdueshme. Sistemi juaj mbetet i shpejtë, i sigurt dhe i përditësuar.",
    examples: ["Monitorim", "Përditësime", "Backup", "Suport", "Përmirësime"],
  },
];
