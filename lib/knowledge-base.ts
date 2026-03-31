// ═══════════════════════════════════════════════════════════════════════════
// SafeTrace — Knowledge Base v1.0
// Fuentes regulatorias curadas (1626 links) + Estructura de matriz HACCP
// Extraído de archivo de favoritos + plan HACCP semillas de chía (ejemplo real)
// ═══════════════════════════════════════════════════════════════════════════

// ─── ESTRUCTURA DE LA MATRIZ HACCP (basada en plan real de chía) ─────────────
// Extraído del archivo: A-CSAicPA_Plan_de_Análisis_de_Peligros_y_Puntos_Críticos_de_Control_Chía.xlsx
// Empresa: Cono Group — Norma: BRCGS Food Safety Issue 9

export const HACCP_MATRIX_STRUCTURE = {
  hojas: [
    "1.Alcance",
    "2.Team de HACCP",
    "3.Descripción del producto",
    "4.Uso previsto",
    "5. Diagrama de flujo",
    "6.Confirmación del diagrama de flujo",
    "8.List of potential hazard",
    "7.1 Lista de peligros y zonas",
    "8.1 PRPs",
    "7.2. Análisis de peligros",
    "8.2.Evaluación del peligro",
    "8.3.Árbol de decisiones de PCC",
    "9.Determinación de PCC",
    "10.HACCP Validation",
    "11. Resumen del plan HACCP",
    "Información",
  ],

  // Columnas de la hoja 7.2 — Análisis de peligros (la más importante)
  analisisPeligros_columnas: [
    "Número de etapa",
    "Etapa del proceso",
    "Distribución por zonas de riesgo",
    "Ubicación",
    "Peligro",
    "Posibles causas/fuentes",
    "Número de peligro",
    "Tipo de peligro",
    "Subcategoría",
    "Nivel de gravedad (1-4)",
    "Comentarios sobre la severidad",
    "Nivel de probabilidad (1-4)",
    "Comentarios sobre la probabilidad",
    "Incidencia histórica dentro de la compañía",
    "Alertas reglamentarias o retiradas de productos",
    "Literatura científica",
    "Nivel de riesgo (gravedad × probabilidad)",
    "Q1 árbol decisiones prerrequisitos",
    "Q2",
    "Q3",
    "Q4",
    "Tipo de control PPR/OPRP/PCC",
    "Medidas de control",
    "Validación de medidas de control",
    "Q1 árbol decisiones PCC",
    "Q2",
    "Q3",
    "Q4",
    "Q5",
    "PCC Yes/No",
  ],

  // Escala de evaluación (de la hoja 8.2)
  escala_gravedad: {
    1: { nivel: "Limitado", criterio: "No existe ningún problema para el consumidor relacionado con la seguridad alimentaria; el peligro nunca puede alcanzar concentración peligrosa." },
    2: { nivel: "Moderado", criterio: "Sin lesiones graves o sólo cuando se expone a concentración extremadamente alta durante largo período. Efecto temporal sobre la salud." },
    3: { nivel: "Grave", criterio: "Efecto claro sobre la salud con síntomas a corto o largo plazo que raramente provoca mortalidad. Efecto a largo plazo; dosis máxima desconocida (dioxinas, pesticidas, micotoxinas)." },
    4: { nivel: "Muy grave", criterio: "Grupo de consumidores de categoría de riesgo; puede provocar mortalidad. Síntomas graves que pueden causar la muerte. Lesiones permanentes." },
  },

  escala_probabilidad: {
    1: { nivel: "Muy baja", criterio: "Posibilidad teórica: el peligro no ha ocurrido nunca en registros históricos de la Compañía ni en retiros de recall o alertas regulatorias de los mismos productos de otras Compañías o productos similares." },
    2: { nivel: "Baja", criterio: "Poco probable que ocurra, pero podría ocurrir, debido a que la literatura científica sustenta su posible aparición." },
    3: { nivel: "Real", criterio: "Es probable que ocurra en algún momento debido a que hay registros de retiro de productos o alertas regulatorias similares o de los mismos productos de otras Compañías, pero no hay antecedentes de su aparición en los registros históricos de la Compañía." },
    4: { nivel: "Elevada", criterio: "Va a ocurrir en algún momento o ya ha ocurrido anteriormente, según los registros históricos. Además hay registros de productos similares o de los mismos productos en otras Compañías, o retiros o alertas regulatorias." },
  },

  // Peligros potenciales identificados en la matriz de chía (referencia para otras categorías)
  peligros_referencia: [
    { id: 1, descripcion: "Presence of non-metallic foreign bodies", tipo: "F" },
    { id: 2, descripcion: "Presence of foreign metallic bodies", tipo: "F" },
    { id: 3, descripcion: "Mycotoxins", tipo: "Q" },
    { id: 4, descripcion: "Radiological Hazard", tipo: "Q" },
    { id: 5, descripcion: "Presence of prohibited pesticide residues or in excess in the raw material", tipo: "Q" },
    { id: 6, descripcion: "Heavy metals", tipo: "Q" },
    { id: 7, descripcion: "Presence of allergenic grains", tipo: "Q" },
    { id: 8, descripcion: "Other grains Genetically Modified Organisms (GMOs)", tipo: "Q" },
    { id: 9, descripcion: "Presence of Pathogenic Microorganisms", tipo: "B" },
    { id: 10, descripcion: "Fraud (deliberate substitution or adulteration)", tipo: "F" },
    { id: 11, descripcion: "Malicious contamination", tipo: "F-Q" },
    { id: 12, descripcion: "Alkaloids and lectins", tipo: "Q" },
    { id: 13, descripcion: "Loss of authenticity in raw materials due to intentional adulteration for economic purposes", tipo: "F-Q" },
    { id: 14, descripcion: "Development of mycotoxin-producing fungi due to increased humidity in Silos Bolsa", tipo: "Q" },
    { id: 15, descripcion: "Danger that Silos Bags are violated by rodents or other types of pests", tipo: "B" },
    { id: 16, descripcion: "Presence of aluminum hydroxide residue", tipo: "Q" },
    { id: 17, descripcion: "Loosening of screen nuts, bolts or rivets due to vibration", tipo: "F" },
    { id: 18, descripcion: "Plastic remains due to breakage of densimetric hopper viewer or stacker crane buckets", tipo: "F" },
    { id: 27, descripcion: "Metal pieces (Swarf, nuts, bolts, broken knives or machinery parts, nails, staples)", tipo: "F" },
    { id: 28, descripcion: "Glass sharps (from windows, lights and fittings, instruments)", tipo: "F" },
    { id: 29, descripcion: "Hard brittle plastic", tipo: "F" },
  ],
};

// ─── FUENTES REGULATORIAS POR CATEGORÍA ──────────────────────────────────────
// 1626 favoritos curados — clasificados para uso en el sistema prompt

export const REGULATORY_SOURCES: Record<string, {
  name: string;
  url: string;
  relevance: string;
  priority: "critical" | "high" | "medium";
}[]> = {

  // ── INTERNACIONAL / CODEX / FAO / WHO ────────────────────────────────────
  international: [
    { name: "Codex Alimentarius", url: "http://www.codexalimentarius.org/", relevance: "Base de todas las normas HACCP, peligros, CCPs y límites", priority: "critical" },
    { name: "FAO Food Safety", url: "http://www.fao.org/food/food-safety-quality/en/", relevance: "Inocuidad alimentaria global", priority: "critical" },
    { name: "WHO Food Safety", url: "http://www.who.int/en/", relevance: "Evaluaciones de riesgos microbiológicos y químicos", priority: "critical" },
    { name: "JECFA Database", url: "https://apps.who.int/food-additives-contaminants-jecfa-database/", relevance: "Evaluaciones de aditivos y contaminantes", priority: "critical" },
    { name: "Codex MRL Pesticides", url: "http://www.codexalimentarius.net/pestres/data/index.html", relevance: "Límites máximos de residuos de plaguicidas Codex", priority: "critical" },
    { name: "IPCS INCHEM JECFA", url: "http://www.inchem.org/pages/jecfa.html", relevance: "Monografías de contaminantes y aditivos", priority: "high" },
    { name: "FAO AGRIS Database", url: "http://www.fao.org/agris/", relevance: "Base de datos de investigaciones agrícolas y alimentarias", priority: "high" },
    { name: "GEMS Food WHO", url: "https://extranet.who.int/gemsfood/", relevance: "Vigilancia global de contaminantes en alimentos", priority: "high" },
    { name: "FAO INFOODS", url: "http://www.fao.org/infoods/infoods/tables-and-databases/en", relevance: "Composición de alimentos y bases de datos nutricionales", priority: "medium" },
    { name: "ECOLEX", url: "http://www.ecolex.org/", relevance: "Legislación ambiental y alimentaria global", priority: "medium" },
    { name: "FAOLEX", url: "http://faolex.fao.org/", relevance: "Base de datos legislación alimentaria global", priority: "high" },
    { name: "WTO", url: "http://www.wto.org/indexsp.htm", relevance: "Acuerdos comerciales y barreras técnicas al comercio (TBT/SPS)", priority: "medium" },
    { name: "IPPC Plant Protection", url: "https://www.ippc.int/es", relevance: "Normas fitosanitarias internacionales", priority: "medium" },
    { name: "IARC Monographs", url: "https://monographs.iarc.fr/", relevance: "Carcinógenos en alimentos", priority: "high" },
    { name: "IARC WHO", url: "https://www.iarc.who.int/", relevance: "Investigación de cáncer relacionado con alimentos", priority: "high" },
  ],

  // ── RECALLS Y ALERTAS ────────────────────────────────────────────────────
  recalls: [
    { name: "FDA Recalls & Safety Alerts", url: "http://www.fda.gov/Safety/Recalls/default.htm", relevance: "Retiros de productos FDA USA — CRÍTICO para análisis de recalls", priority: "critical" },
    { name: "FDA Import Alerts", url: "http://www.fda.gov/ForIndustry/ImportProgram/ImportAlerts/", relevance: "Alertas de importación FDA", priority: "critical" },
    { name: "RASFF Portal UE", url: "https://webgate.ec.europa.eu/rasff-window/portal/index.cfm?event=notificationsList", relevance: "Sistema de alerta rápida de la UE — CRÍTICO", priority: "critical" },
    { name: "RASFF European Commission", url: "http://ec.europa.eu/food/safety/rasff/index_en.htm", relevance: "Portal principal RASFF", priority: "critical" },
    { name: "FSANZ Food Recalls Australia", url: "http://www.foodstandards.gov.au/industry/foodrecalls/Pages/default.aspx", relevance: "Retiros Australia/NZ", priority: "high" },
    { name: "AU Recalls", url: "https://www.recalls.gov.au/content/index.phtml/itemId/952401", relevance: "Portal de recalls Australia", priority: "high" },
    { name: "JP MHLW Imported Foods Inspection", url: "http://www.mhlw.go.jp/english/topics/importedfoods/index.html", relevance: "Inspección de alimentos importados Japón", priority: "high" },
    { name: "GlobalRecalls OECD", url: "http://globalrecalls.oecd.org/", relevance: "Base de datos global de retiros de productos", priority: "high" },
    { name: "CFIA Recalls Canada", url: "https://healthycanadians.gc.ca/recall", relevance: "Retiros Canadá CFIA", priority: "high" },
    { name: "SENASA Alertas Argentina", url: "http://www.senasa.gob.ar/", relevance: "Alertas sanitarias Argentina", priority: "high" },
    { name: "ANVISA Recalls Brasil", url: "http://antigo.anvisa.gov.br/novahome", relevance: "Retiros de mercado Brasil", priority: "high" },
    { name: "FDA Access Import Alerts", url: "https://www.accessdata.fda.gov/cms_ia/default.html", relevance: "Base de datos alertas de importación FDA", priority: "critical" },
  ],

  // ── MICROBIOLOGÍA / ICMSF ────────────────────────────────────────────────
  microbiology: [
    { name: "ICMSF Publications", url: "http://www.icmsf.org/main/articles_papers.html", relevance: "ICMSF Microorganisms in Foods — referencia obligatoria HACCP", priority: "critical" },
    { name: "ICMSF Main", url: "http://www.icmsf.org/", relevance: "International Commission on Microbiological Specifications for Foods", priority: "critical" },
    { name: "FDA Bacteriological Analytical Manual (BAM)", url: "https://www.fda.gov/food/laboratory-methods-food/bacteriological-analytical-manual-bam", relevance: "Métodos analíticos microbiológicos FDA — referencia para límites", priority: "critical" },
    { name: "FDA Bad Bug Book", url: "https://www.fda.gov/food/foodborne-pathogens/", relevance: "Patógenos de transmisión alimentaria — base científica de peligros biológicos", priority: "critical" },
    { name: "EFSA Scientific Opinions", url: "https://www.efsa.europa.eu/es/publications", relevance: "Opiniones científicas EFSA sobre patógenos y contaminantes", priority: "critical" },
    { name: "EFSA", url: "http://www.efsa.europa.eu/EFSA/efsa_locale-1178620753812_home.htm", relevance: "Autoridad Europea de Seguridad Alimentaria", priority: "critical" },
    { name: "CDC Food Safety", url: "http://www.cdc.gov/", relevance: "Centers for Disease Control — epidemiología de enfermedades transmitidas por alimentos", priority: "high" },
    { name: "IAFP Journal of Food Protection", url: "http://www.foodprotection.org/", relevance: "International Association for Food Protection — publicaciones científicas", priority: "high" },
    { name: "ASM Applied and Environmental Microbiology", url: "http://journals.asm.org/", relevance: "AEM — revista de referencia en microbiología de alimentos", priority: "high" },
    { name: "Pathogen Modeling Program USDA", url: "http://www.arserrc.gov/mfs/PMP6_Start.htm", relevance: "Modelos predictivos de crecimiento de patógenos", priority: "medium" },
    { name: "National Microbiology Laboratory Canada", url: "http://www.nml-lnm.gc.ca/english/index.html", relevance: "Laboratorio referencia microbiológica Canadá", priority: "medium" },
  ],

  // ── CONTAMINANTES QUÍMICOS ────────────────────────────────────────────────
  contaminants: [
    { name: "EU Pesticides Database", url: "https://food.ec.europa.eu/plants/pesticides/eu-pesticides-database_en", relevance: "Base de datos LMR pesticidas UE — obligatorio para exportación a Europa", priority: "critical" },
    { name: "EFSA Pesticide MRL Database", url: "https://www.efsa.europa.eu/", relevance: "Evaluaciones EFSA de pesticidas", priority: "critical" },
    { name: "FDA Pesticide Analytical Manual (PAM)", url: "https://www.fda.gov/food/laboratory-methods-food/pesticide-analytical-manual-pam", relevance: "Métodos analíticos de plaguicidas FDA", priority: "critical" },
    { name: "EPA Pesticide Tolerances", url: "https://www.epa.gov/pesticide-tolerances", relevance: "Tolerancias de pesticidas en alimentos USA", priority: "critical" },
    { name: "USDA MRL Database", url: "https://www.fas.usda.gov/maximum-residue-limits-mrl-database", relevance: "Base de datos global de LMR por producto/mercado", priority: "critical" },
    { name: "Legislación pesticidas España", url: "http://plaguicidas.comercio.es/", relevance: "LMR pesticidas por país destino — 30+ países", priority: "high" },
    { name: "EFSA CONTAM Panel", url: "https://www.efsa.europa.eu/es/topics/topic/food-contact-materials", relevance: "Panel de contaminantes EFSA", priority: "high" },
    { name: "EU Reg 1881/2006 Contaminants", url: "https://eur-lex.europa.eu/", relevance: "Límites máximos de contaminantes en alimentos UE (micotoxinas, metales pesados, dioxinas, PAHs)", priority: "critical" },
    { name: "FDA 21 CFR Contaminants", url: "https://www.ecfr.gov/cgi-bin/ECFR?page=browse", relevance: "FDA 21 CFR Part 109 y 193 — contaminantes y pesticidas USA", priority: "critical" },
    { name: "Codex STAN 193-1995 Contaminants", url: "http://www.codexalimentarius.org/", relevance: "Norma general para los contaminantes y las toxinas — referencia global", priority: "critical" },
    { name: "ECHA Registered Substances", url: "https://echa.europa.eu/information-on-chemicals/registered-substances", relevance: "Sustancias químicas registradas UE", priority: "medium" },
    { name: "ECHA Legislation", url: "https://echa.europa.eu/es/legislation", relevance: "REACH, CLP y biocidas UE", priority: "medium" },
    { name: "WHO/FAO JECFA Evaluations", url: "https://apps.who.int/food-additives-contaminants-jecfa-database/", relevance: "Evaluaciones de seguridad de aditivos y contaminantes", priority: "critical" },
    { name: "ARN Argentina Radionucleidos", url: "https://www.argentina.gob.ar/cnea/tramites", relevance: "Autoridad Regulatoria Nuclear Argentina — monitoreo ambiental (referenciado en matriz chía)", priority: "medium" },
    { name: "EPA Radionuclides Rule", url: "https://www.epa.gov/dwreginfo/radionuclides-rule", relevance: "Regla de radionucleidos en agua potable USA", priority: "medium" },
  ],

  // ── ALÉRGENOS ─────────────────────────────────────────────────────────────
  allergens: [
    // Legislación por mercado
    { name: "FDA FASTER Act 2023 (eCFR)", url: "https://www.ecfr.gov/cgi-bin/ECFR?page=browse", relevance: "FDA FASTER Act 2023 — Big 9 incluyendo sésamo — obligatorio mercado USA", priority: "critical" },
    { name: "EU Regulation 1169/2011", url: "https://eur-lex.europa.eu/", relevance: "Big 14 alérgenos UE — declaración obligatoria", priority: "critical" },
    { name: "FSANZ Food Standards Code", url: "https://www.foodstandards.gov.au/code/Pages/default.aspx", relevance: "Standard 1.2.3 Australia/NZ alérgenos", priority: "critical" },
    { name: "CFIA Food Labelling Canada", url: "https://inspection.canada.ca/food-labels/labelling/industry/eng/1383607266489/1383607344939", relevance: "Safe Food for Canadians Regulations — alérgenos Canadá", priority: "critical" },
    { name: "UK Food Information Regulations", url: "https://www.food.gov.uk/", relevance: "UK post-Brexit — Big 14 alérgenos", priority: "critical" },
    { name: "Japan CAA Food Labelling", url: "https://www.caa.go.jp/en/policy/food_labeling/", relevance: "Japan Food Labeling Act 2015 — 28 alérgenos", priority: "high" },
    { name: "Argentina CAA Art. 235", url: "https://www.argentina.gob.ar/anmat/codigoalimentario", relevance: "CAA Art. 235 quinquies — alérgenos Argentina", priority: "critical" },
    { name: "ANVISA RDC 26/2015 Brasil", url: "http://antigo.anvisa.gov.br/novahome", relevance: "ANVISA RDC 26/2015 — rotulagem alérgenos Brasil", priority: "critical" },
    { name: "Mercosur GMC 26/03", url: "http://www.mercosur.int/", relevance: "Resolución GMC 26/03 — alérgenos Mercosur", priority: "critical" },
    { name: "SFDA Saudi Arabia", url: "https://www.sfda.gov.sa/en", relevance: "Food labeling Saudi Arabia including allergens", priority: "high" },
    { name: "Israel Ministry of Health Labelling", url: "https://www.gov.il/en/Departments/Guides/food-labeling", relevance: "Etiquetado nutricional y alérgenos Israel", priority: "high" },
    // Organizaciones científicas
    { name: "FAO Food Allergens", url: "https://www.fao.org/food-safety/scientific-advice/food-allergens/en/", relevance: "Base científica de alérgenos alimentarios FAO", priority: "high" },
    { name: "VITAL Allergen Bureau AU", url: "http://allergenbureau.net/vital/", relevance: "VITAL — sistema de evaluación de riesgos alérgenos Australia", priority: "high" },
    { name: "Allergen Online", url: "http://www.allergenonline.org/", relevance: "Base de datos proteínas alergénicas", priority: "high" },
    { name: "FARE Food Allergy Research", url: "http://www.foodallergy.org/home", relevance: "Investigación en alergias alimentarias USA", priority: "medium" },
    { name: "World Allergy Organization", url: "http://www.worldallergy.org/", relevance: "Organización Mundial de Alergias", priority: "medium" },
    { name: "EAACI European Academy Allergy", url: "http://www.eaaci.org/", relevance: "Academia Europea de Alergia e Inmunología Clínica", priority: "medium" },
    { name: "ICC IFAAM Allergen Management", url: "https://www.icc.or.at/projects/ifaam", relevance: "Enfoques integrados para gestión de riesgo de alérgenos", priority: "medium" },
  ],

  // ── NORMAS GFSI / BRC / SQF / FSSC ──────────────────────────────────────
  gfsi_standards: [
    { name: "BRCGS Webinars", url: "https://www.brcgs.com/resources/webinars/", relevance: "BRCGS Food Safety Issue 9 — recursos y actualizaciones", priority: "critical" },
    { name: "SQF Edition 9 Downloads", url: "https://www.sqfi.com/resource-center/sqf-code-edition-9-downloads/", relevance: "SQF Edition 9 — código completo descargable", priority: "critical" },
    { name: "Codex CAC/RCP 1-1969", url: "http://www.codexalimentarius.org/", relevance: "Código de prácticas HACCP Codex — base de todos los planes HACCP", priority: "critical" },
    { name: "FSSC 22000 (EFSA/ISO)", url: "https://www.efsa.europa.eu/", relevance: "FSSC 22000 — referencia normativa", priority: "critical" },
    { name: "ISO 22000:2018", url: "http://www.iram.org.ar/", relevance: "ISO 22000 gestión de inocuidad — IRAM Argentina", priority: "critical" },
    { name: "AIB International", url: "https://www.aibinternational.com/", relevance: "American Institute of Baking — auditorías y formación HACCP", priority: "high" },
    { name: "FSPCA IIT", url: "https://www.ifsh.iit.edu/fspca", relevance: "Food Safety Preventive Controls Alliance — FSMA, PCQI training", priority: "high" },
    { name: "IAFP Food Protection", url: "http://www.foodprotection.org/", relevance: "International Association for Food Protection", priority: "high" },
  ],

  // ── BASES CIENTÍFICAS / JOURNALS / I+D ───────────────────────────────────
  scientific: [
    { name: "Journal of Food Protection", url: "http://www.ingentaconnect.com/content/iafp/jfp", relevance: "Revista de referencia en inocuidad alimentaria", priority: "critical" },
    { name: "Food Control (Elsevier)", url: "https://www.sciencedirect.com/journal/food-control", relevance: "Control de alimentos — publicaciones sobre HACCP, patógenos, contaminantes", priority: "critical" },
    { name: "Food Microbiology (Elsevier)", url: "https://www.sciencedirect.com/journal/food-microbiology", relevance: "Microbiología de alimentos — referencia para peligros biológicos", priority: "critical" },
    { name: "International Journal of Food Microbiology", url: "https://www.sciencedirect.com/journal/international-journal-of-food-microbiology", relevance: "Microbiología alimentaria internacional", priority: "critical" },
    { name: "Food Chemistry (Elsevier)", url: "https://www.sciencedirect.com/journal/food-chemistry", relevance: "Química de alimentos — contaminantes y aditivos", priority: "high" },
    { name: "Journal of Food Science (IFT)", url: "http://members.ift.org/IFT/Pubs/JournalofFoodSci/", relevance: "IFT — ciencia y tecnología de alimentos", priority: "high" },
    { name: "Food Technology (IFT)", url: "http://members.ift.org/IFT/Pubs/FoodTechnology/", relevance: "Tecnología alimentaria — tendencias e innovación", priority: "high" },
    { name: "Trends in Food Science & Technology", url: "https://www.sciencedirect.com/journal/trends-in-food-science-and-technology", relevance: "Tendencias en ciencia y tecnología de alimentos", priority: "high" },
    { name: "Critical Reviews in Food Science and Nutrition", url: "https://www.tandfonline.com/toc/bfsn20/current", relevance: "Revisiones críticas en ciencia y nutrición de alimentos", priority: "high" },
    { name: "LWT Food Science and Technology", url: "https://www.sciencedirect.com/journal/lwt", relevance: "Tecnología de alimentos y nutrición", priority: "medium" },
    { name: "Food and Chemical Toxicology", url: "http://www.elsevier.com/wps/find/journaldescription.cws_home/237/description", relevance: "Toxicología de alimentos y sustancias químicas", priority: "high" },
    { name: "Journal of Agricultural and Food Chemistry (ACS)", url: "https://pubs.acs.org/journal/jafcau", relevance: "Química agrícola y alimentaria — ACS Publications", priority: "high" },
    { name: "ScienceDirect Elsevier", url: "http://www.elsevier.com/", relevance: "Base de datos científica — búsqueda de literatura HACCP", priority: "high" },
    { name: "PubMed NCBI", url: "https://pubmed.ncbi.nlm.nih.gov/", relevance: "Base de datos médica y microbiológica — referencias bibliográficas", priority: "critical" },
    { name: "Google Scholar", url: "https://scholar.google.com/", relevance: "Búsqueda de literatura científica general", priority: "high" },
    { name: "FAO Food Quality and Safety", url: "http://www.fao.org/food/food-safety-quality/en/", relevance: "Publicaciones FAO sobre calidad e inocuidad", priority: "high" },
    { name: "Encyclopedia of Food Sciences ScienceDirect", url: "https://www.sciencedirect.com/referencework/9780122270550/encyclopedia-of-food-sciences-and-nutrition", relevance: "Enciclopedia de ciencias alimentarias", priority: "medium" },
  ],

  // ── LEGISLACIÓN ARGENTINA ────────────────────────────────────────────────
  argentina: [
    { name: "ANMAT", url: "https://www.argentina.gob.ar/anmat", relevance: "Administración Nacional de Medicamentos, Alimentos y Tecnología Médica", priority: "critical" },
    { name: "Código Alimentario Argentino (CAA)", url: "https://www.argentina.gob.ar/anmat/codigoalimentario", relevance: "CAA — norma madre de alimentos Argentina — obligatoria para todos los HACCP en AR", priority: "critical" },
    { name: "SENASA", url: "http://www.senasa.gob.ar/", relevance: "Servicio Nacional de Sanidad y Calidad Agroalimentaria", priority: "critical" },
    { name: "CONAL", url: "http://www.conal.gob.ar/", relevance: "Comisión Nacional de Alimentos — modificaciones al CAA", priority: "critical" },
    { name: "INFOLEG", url: "http://www.infoleg.gob.ar/", relevance: "Legislación nacional Argentina — búsqueda de normas", priority: "high" },
    { name: "Boletín Oficial Argentina", url: "http://www.boletinoficial.gov.ar/", relevance: "Publicación oficial de normas nacionales", priority: "high" },
    { name: "Alimentos Argentinos", url: "http://www.alimentosargentinos.gob.ar/HomeAlimentos/", relevance: "Publicaciones sobre calidad de alimentos argentinos", priority: "medium" },
    { name: "SENASA Digesto", url: "http://digesto.senasa.gob.ar/digestosenasa.nsf", relevance: "Digesto normativo SENASA", priority: "high" },
    { name: "SAIJ", url: "http://www.saij.gob.ar/home", relevance: "Sistema Argentino de Información Jurídica", priority: "high" },
    { name: "Acceso SIFEGA", url: "https://www.argentina.gob.ar/anmat/regulados/alimentos/sifega/accesos-al-sistema", relevance: "Sistema federal de gestión de alimentos", priority: "high" },
    { name: "Punto Focal Notificaciones", url: "http://www.puntofocal.gov.ar/", relevance: "Notificaciones sanitarias y fitosanitarias Argentina-OMC", priority: "medium" },
    { name: "ARICCAME Cannabis", url: "https://www.argentina.gob.ar/ariccame", relevance: "Agencia de regulación cannabis Argentina", priority: "low" },
  ],

  // ── LEGISLACIÓN UNIÓN EUROPEA ────────────────────────────────────────────
  european_union: [
    { name: "EUR-Lex", url: "http://eur-lex.europa.eu/en/index.htm", relevance: "Legislación UE — reglamentos de aditivos, contaminantes, etiquetado, alérgenos", priority: "critical" },
    { name: "European Commission Food Safety", url: "https://ec.europa.eu/food/safety/labelling_nutrition/labelling_legislation_en", relevance: "Legislación de seguridad alimentaria UE", priority: "critical" },
    { name: "EFSA Publications", url: "https://www.efsa.europa.eu/es/publications", relevance: "Opiniones científicas EFSA", priority: "critical" },
    { name: "EU Pesticides Database", url: "https://food.ec.europa.eu/plants/pesticides/eu-pesticides-database_en", relevance: "LMR pesticidas UE — obligatorio exportación", priority: "critical" },
    { name: "Food and Feed Information Portal FIP", url: "https://ec.europa.eu/food/food-feed-portal/screen/home", relevance: "Portal de información alimentaria UE", priority: "critical" },
    { name: "EU GMO Register", url: "https://food.ec.europa.eu/plants/genetically-modified-organisms/gmo-register_en", relevance: "Registro de OMG autorizados UE", priority: "high" },
    { name: "RASFF Portal", url: "https://webgate.ec.europa.eu/rasff-window/portal/index.cfm?event=notificationsList", relevance: "Alertas rápidas de alimentos y piensos UE", priority: "critical" },
    { name: "TRACES EU", url: "https://webgate.ec.europa.eu/tracesnt/login", relevance: "Sistema de trazabilidad y certificación animal UE", priority: "medium" },
    { name: "Market Access Database EU", url: "http://madb.europa.eu/mkaccdb2/indexPubli.htm", relevance: "Acceso a mercados UE — requisitos de importación", priority: "high" },
    { name: "Import Conditions EC", url: "https://ec.europa.eu/food/safety/international_affairs/trade_en", relevance: "Condiciones de importación de alimentos a la UE", priority: "critical" },
    { name: "ECHA Biocidal Active Substances", url: "https://echa.europa.eu/regulations/biocidal-products-regulation/approval-of-active-substances/list-of-approved-active-substances", relevance: "Sustancias biocidas aprobadas UE — desinfectantes en plantas", priority: "medium" },
    { name: "EU Nutrition Labelling", url: "https://food.ec.europa.eu/safety/labelling-and-nutrition/food-information-consumers-legislation/nutrition-labelling_en", relevance: "Tolerancias y requisitos de rotulación nutricional UE", priority: "high" },
    { name: "EUFIC", url: "http://www.eufic.org/", relevance: "Consejo Europeo de Información sobre la Alimentación", priority: "medium" },
    { name: "CEN European Standards", url: "https://www.cen.eu/Pages/default.aspx", relevance: "Normas técnicas europeas EN", priority: "medium" },
  ],

  // ── LEGISLACIÓN USA / FDA / USDA ─────────────────────────────────────────
  usa: [
    { name: "FDA Main", url: "http://www.fda.gov/", relevance: "Food and Drug Administration USA — autoridad regulatoria principal", priority: "critical" },
    { name: "FDA eCFR 21 CFR", url: "https://www.ecfr.gov/cgi-bin/ECFR?page=browse", relevance: "21 CFR completo — regulaciones FDA para alimentos", priority: "critical" },
    { name: "FDA Food Safety", url: "https://www.fda.gov/food/new-era-smarter-food-safety", relevance: "Nueva era de seguridad alimentaria — FSMA", priority: "critical" },
    { name: "FDA Guidance Documents", url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents", relevance: "Guías de orientación FDA para alimentos", priority: "critical" },
    { name: "FDA Compliance Policy Guides", url: "https://www.fda.gov/iceci/compliancemanuals/compliancepolicyguidancemanual/default.htm", relevance: "Niveles de acción para defectos — contaminantes físicos", priority: "critical" },
    { name: "FDA Bacteriological Analytical Manual", url: "https://www.fda.gov/food/laboratory-methods-food/bacteriological-analytical-manual-bam", relevance: "BAM — métodos microbiológicos FDA", priority: "critical" },
    { name: "USDA", url: "http://www.usda.gov/", relevance: "Departamento de Agricultura USA", priority: "critical" },
    { name: "FDA Import Alerts Database", url: "https://www.accessdata.fda.gov/cms_ia/default.html", relevance: "Base datos alertas importación FDA", priority: "critical" },
    { name: "FDA GRAS Notices", url: "https://www.cfsanappsexternal.fda.gov/scripts/fdcc/index.cfm?set=GRASNotices", relevance: "Notificaciones GRAS — Generally Recognized as Safe", priority: "high" },
    { name: "FDA Food Additive Status List", url: "https://www.fda.gov/food/food-additives-petitions/food-additive-status-list", relevance: "Lista de estado de aditivos alimentarios FDA", priority: "high" },
    { name: "EPA Pesticide Tolerances", url: "https://www.epa.gov/pesticide-tolerances", relevance: "Tolerancias de pesticidas en alimentos EPA", priority: "critical" },
    { name: "EPA Drinking Water Standards", url: "https://www.epa.gov/dwstandardsregulations", relevance: "Estándares de agua potable EPA", priority: "medium" },
    { name: "Federal Register USA", url: "https://www.federalregister.gov/", relevance: "Registro Federal — publicación normas USA", priority: "high" },
    { name: "USDA FAS MRL Database", url: "https://www.fas.usda.gov/maximum-residue-limits-mrl-database", relevance: "Base de datos global MRL USDA", priority: "critical" },
    { name: "FDA Interactive Nutrition Facts", url: "https://www.accessdata.fda.gov/scripts/InteractiveNutritionFactsLabel/#intro", relevance: "Etiquetado nutricional FDA interactivo", priority: "medium" },
    { name: "FSIS USDA Blue Book Residue", url: "https://www.fsis.usda.gov/sites/default/files/media_file/2020-07/2019-blue-book.pdf", relevance: "Programa de residuos USDA FSIS", priority: "high" },
    { name: "SQFI SQF Edition 9", url: "https://www.sqfi.com/resource-center/sqf-code-edition-9-downloads/", relevance: "SQF Edition 9 código completo", priority: "critical" },
  ],

  // ── CANADA ───────────────────────────────────────────────────────────────
  canada: [
    { name: "CFIA Food Labelling", url: "https://inspection.canada.ca/food-labels/labelling/industry/eng/1383607266489/1383607344939", relevance: "CFIA — etiquetado alimentos Canadá incluyendo alérgenos", priority: "critical" },
    { name: "Health Canada Food", url: "http://www.hc-sc.gc.ca/food-aliment/e_index.html", relevance: "Programa de alimentos Health Canada", priority: "critical" },
    { name: "CFIA Recalls", url: "https://healthycanadians.gc.ca/recall", relevance: "Retiros de productos Canadá", priority: "critical" },
    { name: "Canada Food and Drug Regulations", url: "http://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._870/FullText.html", relevance: "Reglamento de Alimentos y Medicamentos Canada", priority: "critical" },
    { name: "Canada MRL Pesticides", url: "http://pr-rp.hc-sc.gc.ca/mrl-lrm/index-eng.php", relevance: "Límites máximos residuos pesticidas Canadá", priority: "high" },
    { name: "Canada Gazette", url: "http://canadagazette.gc.ca/gazette/home-accueil-fra.php", relevance: "Gaceta oficial Canadá — nuevas normas", priority: "medium" },
    { name: "CFIA Microbiological Methods", url: "http://www.hc-sc.gc.ca/fn-an/res-rech/analy-meth/microbio/index_e.html", relevance: "Métodos microbiológicos Canadá", priority: "high" },
  ],

  // ── AUSTRALIA / NZ ───────────────────────────────────────────────────────
  australia_nz: [
    { name: "FSANZ Food Standards Code", url: "https://www.foodstandards.gov.au/code/Pages/default.aspx", relevance: "Código de normas alimentarias Australia/NZ — alérgenos, aditivos, contaminantes", priority: "critical" },
    { name: "FSANZ Food Recalls", url: "http://www.foodstandards.gov.au/industry/foodrecalls/Pages/default.aspx", relevance: "Retiros de alimentos Australia/NZ", priority: "critical" },
    { name: "APVMA Pesticides AU", url: "http://apvma.gov.au/", relevance: "Autoridad australiana de plaguicidas y medicamentos veterinarios", priority: "high" },
    { name: "DAFF Import Australia", url: "https://www.agriculture.gov.au/biosecurity-trade/import", relevance: "Importación bioseguridad Australia", priority: "high" },
    { name: "BICON Biosecurity Import", url: "https://bicon.agriculture.gov.au/BiconWeb4.0/", relevance: "Condiciones de importación bioseguridad Australia", priority: "high" },
    { name: "FSANZ Nutrition Panel Calculator", url: "https://www.foodstandards.gov.au/business/labelling/nutrition-panel-calculator", relevance: "Calculadora paneles nutricionales Australia/NZ", priority: "medium" },
    { name: "Allergen Bureau VITAL AU", url: "http://allergenbureau.net/vital/", relevance: "VITAL — evaluación cuantitativa de riesgo de alérgenos", priority: "high" },
  ],

  // ── BRASIL / ANVISA ───────────────────────────────────────────────────────
  brazil: [
    { name: "ANVISA Brasil", url: "http://www.anvisa.gov.br/", relevance: "Agencia Nacional de Vigilancia Sanitaria Brasil", priority: "critical" },
    { name: "ANVISA Bibliografía Alimentos", url: "https://www.gov.br/anvisa/pt-br/assuntos/regulamentacao/legislacao/bibliotecas-tematicas", relevance: "Legislación alimentaria Brasil — completa", priority: "critical" },
    { name: "ANVISA Monografías Agrotóxicos", url: "https://www.gov.br/anvisa/pt-br/acessoainformacao/dadosabertos/informacoes-analiticas/monografias-de-agrotoxicos", relevance: "Monografías de agrotóxicos Brasil", priority: "critical" },
    { name: "MAPA Brasil", url: "http://www.agricultura.gov.br/", relevance: "Ministerio de Agricultura Brasil — normas de productos animales y vegetales", priority: "critical" },
    { name: "INMETRO Brasil", url: "http://www.inmetro.gov.br/", relevance: "Metrología y normas técnicas Brasil", priority: "high" },
    { name: "SISLEGIS Brasil", url: "http://www.agricultura.gov.br/portal/page?_pageid=33,961080", relevance: "Sistema de legislação agrícola Brasil", priority: "high" },
    { name: "Portal da Legislação BR", url: "http://www4.planalto.gov.br/legislacao", relevance: "Legislación federal Brasil", priority: "high" },
    { name: "CTNBio OGMs Brasil", url: "http://ctnbio.mcti.gov.br/inicio", relevance: "Comisión Técnica Nacional de Bioseguridad — OGMs Brasil", priority: "medium" },
  ],

  // ── MERCOSUR ──────────────────────────────────────────────────────────────
  mercosur: [
    { name: "Mercosur Secretaría", url: "http://www.mercosur.int/", relevance: "Normas Mercosur — aditivos, contaminantes, rotulación GMC", priority: "critical" },
    { name: "INFOLEG Mercosur", url: "http://infoleg.mecon.gov.ar/basehome/norma_mercosur.htm", relevance: "Normas Mercosur en INFOLEG", priority: "high" },
    { name: "INMETRO RTM Alimentos", url: "http://www.inmetro.gov.br/barreirastecnicas/rtm_alimentos.asp", relevance: "Reglamentos Técnicos Mercosur en alimentos", priority: "high" },
    { name: "ALADI", url: "https://www.aladi.org/sitioaladi/", relevance: "Asociación Latinoamericana de Integración — normas comerciales", priority: "medium" },
  ],

  // ── CHILE ─────────────────────────────────────────────────────────────────
  chile: [
    { name: "Ministerio de Salud Chile", url: "https://www.minsal.cl/", relevance: "Normas sanitarias alimentos Chile", priority: "critical" },
    { name: "SAG Chile", url: "http://www.sag.gob.cl/portal.asp", relevance: "Servicio Agrícola y Ganadero Chile", priority: "high" },
    { name: "ACHIPIA", url: "http://www.achipia.cl/", relevance: "Agencia Chilena para la Inocuidad y Calidad Alimentaria", priority: "high" },
    { name: "Ley Chile BCN", url: "https://www.leychile.cl/Consulta/homebasico", relevance: "Biblioteca del Congreso Nacional Chile — búsqueda de leyes", priority: "high" },
    { name: "INN Chile", url: "http://www.inn.cl/portada/index.php", relevance: "Instituto Nacional de Normalización Chile", priority: "medium" },
    { name: "AFIPA Chile Pesticidas", url: "https://www.afipa.cl/afipa-chile/", relevance: "Asociación de fitosanitarios Chile", priority: "medium" },
    { name: "Normativas SAG Chile", url: "http://normativa.sag.gob.cl/Publico/Inicio.aspx", relevance: "Normativas SAG Chile — pesticidas, fitosanitarios", priority: "high" },
    { name: "Chile MRL SAG", url: "http://defensa.sag.gob.cl/reqmercado/", relevance: "Requisitos de importación Chile por mercado", priority: "high" },
  ],

  // ── MEXICO ────────────────────────────────────────────────────────────────
  mexico: [
    { name: "COFEPRIS NOMs", url: "http://www.cofepris.gob.mx/MJ/Paginas/Normas-Oficiales-Mexicanas.aspx", relevance: "Normas Oficiales Mexicanas alimentos — COFEPRIS", priority: "critical" },
    { name: "Secretaría de Salud México", url: "http://www.salud.gob.mx/", relevance: "Normas sanitarias alimentos México", priority: "critical" },
    { name: "SENASICA México", url: "https://sistemasssl.senasica.gob.mx/mcrfi/", relevance: "Servicio Nacional de Sanidad Inocuidad y Calidad Agroalimentaria México", priority: "high" },
    { name: "DOF México", url: "http://www.dof.gob.mx/", relevance: "Diario Oficial de la Federación México — publicación normas", priority: "high" },
    { name: "SAGARPA México", url: "https://www.gob.mx/sagarpa#343", relevance: "Secretaría de Agricultura México", priority: "high" },
    { name: "Aditivos COFEPRIS", url: "https://www.gob.mx/cofepris/es/acciones-y-programas/aditivos-alimentarios-no-publicados-en-el-dof", relevance: "Aditivos alimentarios no publicados en DOF México", priority: "medium" },
  ],

  // ── JAPÓN ────────────────────────────────────────────────────────────────
  japan: [
    { name: "MHLW Japan Health", url: "https://www.mhlw.go.jp/english/", relevance: "Ministerio de Salud Trabajo y Bienestar Japón", priority: "critical" },
    { name: "MHLW Imported Foods Inspection", url: "https://www.mhlw.go.jp/english/topics/importedfoods/index.html", relevance: "Inspección de alimentos importados Japón — requisitos", priority: "critical" },
    { name: "CAA Japan Food Labelling", url: "https://www.caa.go.jp/en/policy/food_labeling/", relevance: "Consumer Affairs Agency Japón — Food Labeling Act 2015 — 28 alérgenos", priority: "critical" },
    { name: "MAFF Japan", url: "https://www.maff.go.jp/e/", relevance: "Ministerio de Agricultura Japón", priority: "high" },
    { name: "Japan MRL Database", url: "http://db.ffcr.or.jp/front/", relevance: "Base de datos LMR plaguicidas Japón", priority: "critical" },
    { name: "JETRO Japan Trade", url: "http://www.jetro.go.jp/", relevance: "Organización de comercio exterior Japón — requisitos importación", priority: "high" },
    { name: "FFCR Japan Food Chemistry", url: "https://www.ffcr.or.jp/index.html", relevance: "Fundación japonesa para investigación en química de alimentos", priority: "high" },
  ],

  // ── CHINA ─────────────────────────────────────────────────────────────────
  china: [
    { name: "CFDA China FDA", url: "http://eng.sfda.gov.cn/WS03/CL0755/", relevance: "FDA China — normas alimentarias", priority: "critical" },
    { name: "SAC China Standards", url: "http://www.sac.gov.cn/sac_en/", relevance: "Organización de Normalización China — estándares GB", priority: "critical" },
    { name: "AQSIQ China", url: "http://english.aqsiq.gov.cn/", relevance: "Control de calidad e inspección China", priority: "high" },
    { name: "MOFCOM China Commerce", url: "http://english.mofcom.gov.cn/", relevance: "Ministerio de Comercio China", priority: "high" },
    { name: "CFS Hong Kong", url: "http://www.cfs.gov.hk/english/food_leg/food_leg.html", relevance: "Centre for Food Safety Hong Kong", priority: "high" },
    { name: "HK Food Legislation", url: "http://www.cfs.gov.hk/english/food_leg/food_leg_list.html", relevance: "Legislación alimentaria Hong Kong", priority: "high" },
  ],

  // ── OTRAS FUENTES RELEVANTES POR CATEGORÍA ───────────────────────────────
  other_countries: [
    // Colombia
    { name: "INVIMA Colombia", url: "https://www.invima.gov.co/", relevance: "Instituto Nacional de Vigilancia de Medicamentos y Alimentos Colombia", priority: "high" },
    { name: "Normograma Sanitario Colombia", url: "https://www.minsalud.gov.co/salud/publica/HS/Paginas/normograma-sanitario-alimentos-y-bebidas.aspx", relevance: "Normograma sanitario de alimentos Colombia", priority: "high" },
    // Perú
    { name: "DIGESA Perú", url: "http://www.digesa.sld.pe/Expedientes/Leyes-Reglamentos.aspx", relevance: "Normas sanitarias alimentos Perú", priority: "high" },
    { name: "SENASA Perú", url: "http://www.senasa.gob.pe/", relevance: "Sanidad agraria Perú", priority: "high" },
    // Uruguay
    { name: "MSP Uruguay Alimentos", url: "http://www.msp.gub.uy/noticia/formularios-departamento-alimentos-cosm%C3%A9ticos-y-domisanitarios", relevance: "Departamento de alimentos Uruguay", priority: "high" },
    { name: "UNIT Uruguay Normas", url: "http://www.unit.org.uy/", relevance: "Instituto Uruguayo de Normas Técnicas", priority: "medium" },
    // Paraguay
    { name: "INAN Paraguay", url: "http://inan.gov.py/newweb/", relevance: "Instituto Nacional de Alimentación y Nutrición Paraguay", priority: "high" },
    { name: "SENAVE Paraguay", url: "http://www.senave.gov.py/", relevance: "Sanidad vegetal Paraguay", priority: "high" },
    // Bolivia
    { name: "SENASAG Bolivia", url: "http://www.senasag.gob.bo/", relevance: "Sanidad agropecuaria Bolivia", priority: "high" },
    // Saudi Arabia
    { name: "SFDA Saudi Arabia", url: "https://www.sfda.gov.sa/en", relevance: "Saudi Food and Drug Authority — alimentos Halal y alérgenos", priority: "high" },
    // India
    { name: "FSSAI India", url: "http://www.fssai.gov.in/home", relevance: "Food Safety and Standards Authority of India", priority: "high" },
    // Israel
    { name: "Israel Ministry of Health Food", url: "https://www.gov.il/en/Departments/Guides/food-labeling", relevance: "Etiquetado nutricional y alérgenos Israel", priority: "high" },
    // Russia/Eurasia
    { name: "Eurasian Economic Commission", url: "http://www.eurasiancommission.org/en/Pages/default.aspx", relevance: "Unión Económica Euroasiática — Reglamentos Técnicos TR CU", priority: "high" },
    { name: "TR CU 021/2011 Food Safety", url: "https://schmidt-export.com/eac-certification/tr-cu-0212011-on-safety-food", relevance: "Reglamento técnico sobre seguridad alimentaria CU/EAEU", priority: "high" },
    // Africa
    { name: "ONSSA Marruecos", url: "https://www.onssa.gov.ma/", relevance: "Office National de Sécurité Sanitaire des produits Alimentaires Marruecos", priority: "medium" },
    { name: "NAFDAC Nigeria", url: "https://www.nafdac.gov.ng/food/", relevance: "Agencia de alimentos y medicamentos Nigeria", priority: "medium" },
    // Corea del Sur
    { name: "MFDS South Korea", url: "http://www.mfds.go.kr/eng/index.do?nMenuCode=67", relevance: "Ministry of Food and Drug Safety Corea del Sur", priority: "high" },
    { name: "Korea Food Labelling", url: "https://www.mfds.go.kr/eng/wpge/m_14/de011005l001.do", relevance: "Sistema etiquetado alimentos Corea", priority: "high" },
    // UK
    { name: "UK Food Standards Agency", url: "http://www.food.gov.uk/", relevance: "Food Standards Agency UK post-Brexit", priority: "critical" },
    { name: "UK Maximum Residue Level Database", url: "https://secure.pesticides.gov.uk/MRLs/main.asp", relevance: "LMR pesticidas UK post-Brexit", priority: "high" },
    // Irlanda
    { name: "FSAI Ireland", url: "http://www.fsai.ie/", relevance: "Food Safety Authority of Ireland — sede Safefood 360°", priority: "high" },
    // Noruega
    { name: "Mattilsynet Norway", url: "https://www.mattilsynet.no/en", relevance: "Norwegian Food Safety Authority", priority: "medium" },
  ],

  // ── ORGANIZACIONES CIENTÍFICAS INTERNACIONALES ───────────────────────────
  scientific_orgs: [
    { name: "IFT Institute of Food Technologists", url: "http://www.ift.org/cms/", relevance: "Instituto de Tecnólogos de Alimentos USA — publicaciones y normas", priority: "high" },
    { name: "IAFP Food Protection", url: "http://www.foodprotection.org/", relevance: "International Association for Food Protection", priority: "critical" },
    { name: "ILSI International Life Sciences", url: "http://www.ilsi.org/", relevance: "Ciencias de la vida — investigaciones en seguridad alimentaria", priority: "high" },
    { name: "ICMSF International Commission", url: "http://www.icmsf.org/", relevance: "Comisión Internacional de Especificaciones Microbiológicas — HACCP microbiológico", priority: "critical" },
    { name: "AOAC International", url: "http://www.aoac.org/", relevance: "Métodos analíticos oficiales para alimentos", priority: "high" },
    { name: "AOCS American Oil Chemists", url: "http://www.aocs.org/", relevance: "Aceites y grasas — métodos analíticos", priority: "medium" },
    { name: "IUPAC", url: "http://www.iupac.org/index_to.html", relevance: "Nomenclatura química internacional", priority: "medium" },
    { name: "ASM Journals Microbiology", url: "http://journals.asm.org/", relevance: "Sociedad Americana de Microbiología — AEM y otras revistas", priority: "high" },
    { name: "CAS Chemical Abstracts", url: "http://www.cas.org/", relevance: "CAS — base de datos química", priority: "medium" },
    { name: "ISTA Seed Testing", url: "http://www.seedtest.org/en/home.html", relevance: "International Seed Testing Association", priority: "low" },
  ],
};

// ─── SYSTEM PROMPT ADDON — Integración de fuentes al motor IA ──────────────
// Esta función genera el bloque de fuentes para agregar al system prompt
export function buildSourcesBlock(): string {
  return `
═══════════════════════════════════════════════════════
FUENTES REGULATORIAS Y CIENTÍFICAS — BASE DE DATOS CURADA
(1626 fuentes organizadas — uso obligatorio según mercado destino)
═══════════════════════════════════════════════════════

RECALLS — MONITOREO OBLIGATORIO:
- FDA Recalls: fda.gov/Safety/Recalls
- RASFF EU Portal: webgate.ec.europa.eu/rasff-window
- CFIA Canada Recalls: healthycanadians.gc.ca/recall
- FSANZ Australia Recalls: foodstandards.gov.au/industry/foodrecalls
- SENASA Argentina: senasa.gob.ar
- ANVISA Brasil: anvisa.gov.br
- GlobalRecalls OECD: globalrecalls.oecd.org
- FDA Import Alerts: accessdata.fda.gov/cms_ia

MICROBIOLOGÍA (PELIGROS BIOLÓGICOS):
- ICMSF Microorganisms in Foods (8 volúmenes): icmsf.org
- FDA Bad Bug Book + BAM: fda.gov/food/foodborne-pathogens
- EFSA Scientific Opinions: efsa.europa.eu/publications
- CDC Foodborne Illness: cdc.gov
- Journal of Food Protection: ingentaconnect.com/content/iafp/jfp
- Applied and Environmental Microbiology (AEM): journals.asm.org
- Food Microbiology (Elsevier): sciencedirect.com
- Int. Journal of Food Microbiology: sciencedirect.com
- PubMed NCBI: pubmed.ncbi.nlm.nih.gov

CONTAMINANTES QUÍMICOS Y PESTICIDAS:
- Codex STAN 193-1995 Rev.2019: codexalimentarius.org
- EU Reg. 1881/2006 + amendments (MRL micotoxinas, metales, dioxinas, PAHs): eur-lex.europa.eu
- EU Regulation 396/2005 (MRL pesticidas): food.ec.europa.eu/plants/pesticides/eu-pesticides-database
- FDA 21 CFR Part 109 y 193: ecfr.gov
- EPA Pesticide Tolerances: epa.gov/pesticide-tolerances
- USDA FAS MRL Database (global): fas.usda.gov/maximum-residue-limits-mrl-database
- JECFA WHO/FAO evaluations: apps.who.int/food-additives-contaminants-jecfa-database
- EFSA CONTAM Panel: efsa.europa.eu
- IARC Monographs carcinógenos: monographs.iarc.fr
- GEMS Food WHO monitoring: extranet.who.int/gemsfood

CONTAMINANTES FÍSICOS:
- FDA Defect Action Levels (CPG Sec. 555.425): fda.gov/iceci/compliancemanuals
- BRCGS Technical Standards: brcgs.com
- FDA Compliance Policy Guides Manual: fda.gov

ALÉRGENOS POR MERCADO:
- USA: FDA FASTER Act 2023 (Big 9 + sésamo) — eCFR 21 CFR 101
- UE: EU Regulation 1169/2011 (Big 14) — eur-lex.europa.eu
- Australia/NZ: FSANZ Food Standards Code Standard 1.2.3 — foodstandards.gov.au
- Canadá: CFIA Safe Food for Canadians Regulations — inspection.canada.ca
- UK: UK Food Information Regulations 2014 — food.gov.uk
- Japón: Food Labeling Act 2015 (28 alérgenos) — caa.go.jp
- Argentina: CAA Art. 235 quinquies — argentina.gob.ar/anmat
- Brasil: ANVISA RDC 26/2015 — anvisa.gov.br
- Mercosur: Resolución GMC 26/03 — mercosur.int
- Arabia Saudita: SFDA — sfda.gov.sa
- Israel: Ministry of Health — gov.il/en/Departments/Guides/food-labeling
- Korea: MFDS Food Labeling — mfds.go.kr

DIARIOS OFICIALES Y LEGISLACIÓN NACIONAL:
- Argentina: boletinoficial.gov.ar + infoleg.gob.ar
- UE: eur-lex.europa.eu + EUR-Lex Official Journal
- USA: federalregister.gov + ecfr.gov
- Brasil: imprensanacional.gov.br + anvisa.gov.br
- Chile: leychile.cl
- México: dof.gob.mx
- Colombia: minsalud.gov.co + invima.gov.co
- Uruguay: impo.com.uy
- Paraguay: bacn.gov.py
- Bolivia: minsalud.gob.bo
- Japón: japaneselawtranslation.go.jp
- China: sac.gov.cn (estándares GB)
- Rusia/EAEU: eurasiancommission.org + gost.ru
- Australia: legislation.gov.au
- Canadá: laws-lois.justice.gc.ca
- UK: food.gov.uk
- España: boe.es + aecosan.msssi.gob.es

NORMAS GFSI Y AUDITORÍA:
- BRCGS Food Safety Issue 9: brcgs.com
- SQF Edition 9: sqfi.com
- FSSC 22000: fssc22000.com
- IFS Food Version 8: ifs-certification.com
- ISO 22000:2018: iram.org.ar
- Codex CAC/RCP 1-1969 Rev.2020: codexalimentarius.org
- FSPCA/PCQI FSMA: ifsh.iit.edu/fspca

BASES DE DATOS CIENTÍFICAS:
- PubMed/NCBI: pubmed.ncbi.nlm.nih.gov
- ScienceDirect/Elsevier: sciencedirect.com
- FSTA Food Science Abstracts: fis.com
- FAO AGRIS: fao.org/agris
- Google Scholar: scholar.google.com

REFERENCIAS ADICIONALES PARA MATRIZ HACCP:
La estructura de la matriz HACCP debe incluir las siguientes columnas
(según plan de referencia BRCGS — semillas de chía, empresa Cono Group):
1. Etapa del proceso con zona de riesgo
2. Peligro potencial + agente específico
3. Causas/fuentes de contaminación
4. Tipo de peligro (B/Q/F) + subcategoría
5. Gravedad (1-4) con criterios documentados
6. Probabilidad (1-4) con incidencia histórica + alertas RASFF/FDA + literatura
7. Riesgo = Gravedad × Probabilidad
8. Árbol decisiones prerrequisitos (Q1-Q4)
9. Tipo de control: PPR / OPRP / PCC
10. Medidas de control con validación
11. Árbol decisiones PCC (Q1-Q5)
12. Determinación PCC: Sí / No

Los CCPs identificados en el plan de referencia de semillas de chía son:
- PCC 1, 3: Detector de metales horizontal (bolsas) — Líneas 1 y 2
  Límites: Fe >3mm / No Fe >3.5mm / SS >3mm
- PCC 2, 4: Detector de metales vertical flow (big bags) — Líneas 1 y 2
  Límites: Fe >2.8mm / No Fe >3.2mm / SS >4mm
Todos en etapa 19: Detección y eliminación de contaminantes metálicos
Registro asociado: "Formulario de prueba del detector de metales" + "Formulario de origen de cuerpos extraños"
`;
}

// ─── EXPORT PARA USO EN SISTEMA PROMPT ───────────────────────────────────────
export const SOURCES_COUNT = 1626;
export const CATEGORIES_COUNT = Object.keys(REGULATORY_SOURCES).length;

export default {
  HACCP_MATRIX_STRUCTURE,
  REGULATORY_SOURCES,
  buildSourcesBlock,
  SOURCES_COUNT,
  CATEGORIES_COUNT,
};
