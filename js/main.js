/* ============================================================
   Dana Kim — site content
   Everything shown on the site lives in the arrays below; the
   pages are rendered by js/site.js. Edit text here, not in HTML.

   Fields that js/site.js understands
   - works:        title, year, medium ("Medium · Shown at"), embed (YouTube id),
                   image (cover/thumbnail), homeImage (home slideshow only),
                   images [gallery], desc, details [strings or {text, paper, after}],
                   keywords [], links [{label, url}], upcoming ("YYYY-MM-DD" shows an
                   Upcoming tag through that day), gridBlur (keep the blurred tile)
   - publications: title, year, tag (type), authors, venue, desc (fallback line),
                   abstract (page text), link (PDF or record), image
   - projects:     title, year, tag, meta (short credit for CV/lists), credit (full
                   credit for the page), image, images, details, keywords, desc, demo
   - exhibitions:  title, year, venue, meta, link, upcoming
   - awards / activities / education / experience: see the entries below
   ============================================================ */

/* --- Profile ------------------------------------------------ */
const education = [
  { year: "2024–26", title: "MS, Metaverse / Culture Technology", venue: "KAIST, Daejeon · Feb 2024 – Aug 2026" },
  { year: "2012–17", title: "BA, Communications", venue: "Yonsei University, Seoul · Minor in Business Administration" },
];
const experience = [
  { year: "2026", company: "Rebel9", role: "Research Intern", meta: "Sep – Nov 2026" },
  { year: "2019–24", company: "KT (Korea Telecom)", role: "Media Marketing Executive", meta: "Seoul · Jul 2019 – Feb 2024" },
  { year: "2016–17", company: "KBS (Korean Broadcasting System)", role: "Digital Contents Creator, Intern", meta: "Seoul · Dec 2016 – Feb 2017" },
];
const researchThemes = ["Place Memory", "Presence and Absence", "Collective Remembering"];
const researchMedia = ["Immersive Storytelling", "3D Visualization", "Documentary Film", "Human-Computer Interaction"];

/* --- CV: awards & selections, exhibitions ------------------- */
const awards = [
  {
    year: "2026",
    title: "Finalist, 4th Coherence Art Competition",
    venue: "IBS Center for Quantum Nanoscience (QNS) · Memories in the Forest Path, photography",
  },
  {
    year: "2024",
    title: "Official Selection, Short Film Competition, 4th Seongbuk Cheongchun Bulpae Film Festival",
    venue: "The Time of Walking in the Forest Path · Arirang Cine Center, Seoul",
  },
  {
    year: "2023",
    title: "Official Selection, Korean Competition (Shorts), 15th DMZ International Documentary Film Festival",
    venue: "The Time of Walking in the Forest Path · World premiere",
  },
];
const exhibitions = [
  {
    year: "2027",
    title: "Finalists' Exhibition, 4th Coherence Art Competition",
    venue: "IBS Science Culture Center, Daejeon",
    meta: "Memories in the Forest Path · expected Apr 2027",
    upcoming: "2027-04-30",
  },
  {
    year: "2026",
    title: "Walking Through Superposed Memories",
    venue: "Onsu Gong-gan, Seoul",
    meta: "Solo exhibition · MCST · KAMS · Arts Korea Lab · 25–29 Nov 2026",
    upcoming: "2026-11-29",
  },
  {
    year: "2026",
    title: "VISAP 2026: Amplification",
    venue: "MIT Met Warehouse, Cambridge, MA",
    meta: "IEEE VIS Arts Program · The Superposed Memory · 9–13 Nov 2026",
    link: "https://visap.net/2026/artwork-8.html",
    upcoming: "2026-11-13",
  },
  {
    year: "2026",
    title: "Arts Korea Lab AI-Convergence Festival 2026",
    venue: "Space S-50, Seongsu, Seoul",
    meta: "Spheres of Memory · MCST · KAMS · Arts Korea Lab · 4–8 Nov 2026",
    upcoming: "2026-11-08",
  },
  {
    year: "2025",
    title: "Arts Korea Lab, Peer to Peer Labday",
    venue: "Seoul",
    meta: "Super Testbed showcase · Quantum Memory Space · MCST · KAMS · Arts Korea Lab · 4–6 Dec 2025",
  },
];
/* --- Works (Artwork) ---------------------------------------- */
const works = [
  {
    title: "Memories in the Forest Path",
    year: "2027",
    upcoming: "2027-04-30",
    medium: "Photography · Finalist, 4th Coherence Art Competition, IBS Center for Quantum Nanoscience (QNS)",
    desc: "A photographic work selected as a finalist in the 4th Coherence Art Competition of the IBS Center for Quantum Nanoscience. To be shown at the IBS Science Culture Center in Daejeon in 2027.",
  },
  {
    title: "Spheres of Memory",
    year: "2026",
    upcoming: "2026-11-08",
    medium: "Interactive media · Arts Korea Lab AI-Convergence Festival 2026, Space S-50, Seoul",
    image: "assets/main.jpg",
    gridBlur: true, // keep the blurred Upcoming field in the Work grid until the show opens
    desc: "Each time we encounter a place where many memories are superposed, a different scene comes to mind. The work begins with the artist's remembering, carried on by walking a forest path again and again. The next scene shifts with how visitors move around the sphere at the center of the space. The visitors' steps follow the path the artist has walked for years. The work does not restore or fix what has disappeared. Walking that path and sensing what is absent becomes a way of living in the present.",
    details: ["Arts Korea Lab AI-Convergence Festival 2026, Space S-50, Seongsu, Seoul, 4–8 Nov 2026"],
  },
  {
    title: "The Superposed Memory",
    year: "2026",
    upcoming: "2026-11-13",
    medium: "Single-channel video projection, c. 10 min loop · VISAP 2026, MIT Met Warehouse, Cambridge, MA",
    image: "assets/works/the-superposed-memory.jpg",
    desc: "The Superposed Memory grew from photographs accumulated over years of walking Gyeongui Line Forest Park in Seoul. Scenes from different periods bound to the same place are trained into a single 3D Gaussian Splatting space, against the technique's assumption that all its input photographs show one moment. Instead of converging into a single image, different times of one place remain latent together and surface by turns as the viewpoint moves. In the installation the superposed scene is projected in a loop of about 10 minutes, and visitors sit on a park bench in front of it, as they would on the path itself.",
    details: ["Selected for VISAP 2026: Amplification, the IEEE VIS Arts Program exhibition (MIT Met Warehouse, Cambridge, MA, 9–13 Nov 2026)"],
    links: [{ label: "VISAP 2026 artwork page", url: "https://visap.net/2026/artwork-8.html" }],
  },
  {
    title: "Quantum Memory Space (VR)",
    year: "2025",
    medium: "VR / interactive media · Arts Korea Lab, Seoul",
    embed: "oKY3vPOFfLc",
    image: "assets/works/quantum-memory-space-vr.jpg",
    images: ["assets/works/quantum-memory-space-vr.jpg"],
    desc: "A VR environment built on the Quantum Memory Space (QMS) model, which treats the memory of a place as a state in which several memories coexist latently and surface differently depending on how they are observed. Scenes of Gyeongui Line Forest Park recorded at different times are trained together in 3D Gaussian Splatting so that their superposition becomes visible. In VR, the viewer's position and gaze condition which time comes forward, and an emotion-based visual modulation shifts the color and density of the scene, so the same place is met anew with each observation.",
    details: [{ text: "Practice case of the master's thesis", paper: "Quantum Memory Space: A Model of Superposition and Observation in Place Memory and Its Visual Implementation", after: "(KAIST, 2026)" }],
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/oKY3vPOFfLc" }],
  },
  {
    title: "Bench Scene",
    year: "2025",
    medium: "Single-channel video projection, 4 min · Arts Korea Lab, Seoul",
    embed: "FsmxMrNcjWs",
    image: "assets/works/bench-scene.jpg",
    images: ["assets/works/bench-scene.jpg"],
    desc: "A single-channel realization of viewpoint-conditioned observation within the Quantum Memory Space model. Recordings of one spot in Gyeongui Line Forest Park, made across different seasons and times of day, are trained into a single 3D Gaussian Splatting scene instead of being kept as separate files. As the virtual camera moves, the different times of the place surface by turns, so that one bench holds several moments at once and the view never settles into a single image.",
    details: [{ text: "Practice case of the master's thesis", paper: "Quantum Memory Space: A Model of Superposition and Observation in Place Memory and Its Visual Implementation", after: "(KAIST, 2026)" }],
    links: [{ label: "Watch on YouTube", url: "https://youtu.be/FsmxMrNcjWs" }],
  },
  {
    title: "Face to Face",
    year: "2024",
    medium: "Projection mapping on a laser-cut architectural model · KAIST Dept. of Industrial Design (Immersive Space, ID430)",
    embed: "ziaP3HuxB0M",
    homeImage: "assets/works/face-to-face-2.jpg", // home slideshow; the Work grid keeps the video still
    images: ["assets/works/face-to-face-1.jpg", "assets/works/face-to-face-2.jpg"],
    desc: "Face to Face looks at Daeseong-dong, the South Korean village inside the DMZ that faces Kijong-dong across the border, as a place where binary ideas meet: individual and society, citizen and nation, peace and war, private and public, South and North. The projection approaches the village in stages. From afar, the outline of the village reads as the pupil of an eye; the lines that divide the region radiate from it, military and political facilities sit along those lines, and news footage about the village plays on either side. Each time the viewer steps over another fence, the view moves one step closer, and what was an outline on a map becomes a place with people in it. At the end the eye opens onto everyday life inside the village: a laser-cut architectural model of its buildings, roads and waterways, animated with projection-mapped video, photographs and sound.",
    details: [
      "With Yerim Han · Immersive Space (ID430), KAIST Dept. of Industrial Design, June 2024",
      "Architectural model: 3D modeling, rendering, laser cutting · Projection mapping: video, photo, sound",
    ],
    links: [{ label: "Watch on YouTube", url: "https://www.youtube.com/watch?v=ziaP3HuxB0M" }],
  },
  {
    title: "Mourning Dew",
    year: "2024",
    medium: "Single-channel video, 1 min 39 sec",
    image: "assets/works/mourning-dew-2.jpg",
    images: ["assets/works/mourning-dew-1.jpg", "assets/works/mourning-dew-3.jpg", "assets/works/mourning-dew-4.jpg"],
    desc: "Mourning Dew draws on Nectar Ritual Painting, or Gamnodo, a genre of Korean Buddhist painting originally made to guide wandering spirits toward liberation through ceremonial practice. Over time Gamnodo took on secular and social dimensions, recording the daily realities and cultural changes of its era, so that scenes of ordinary life sit beside the ritual itself. The video collages imagery from two Gamnodo paintings and maps it onto the surface of a digitally rendered moktak, the wooden percussion instrument struck during Buddhist ceremony. As the camera moves over the grain of the wood, hungry ghosts, mourners and small vignettes of everyday life surface and recede, turning the painting into a ceremonial digital experience. The work asks how a traditional form can be carried into contemporary storytelling while its original purpose, the consolation of the dead and the living, is kept intact.",
    details: [{ text: "Developed in the ISEA 2025 paper", paper: "Mourning Dew: Storytelling of Nectar Ritual Painting through the Digital Moktak", after: "(Kim, Choi & Lee)" }],
    links: [{ label: "Paper", url: "https://www.isea-symposium-archives.org/wp-content/uploads/2025/09/2025_Kim_Mourning-Dew-Storytelling-of-Nectar-Ritual-Painting-through-the-Digital-Moktak.pdf" }],
  },
  {
    title: "The Time of Walking in the Forest Path",
    year: "2023",
    medium: "Documentary short, 12 min",
    embed: "2NYD9IhMjkU",
    desc: "A documentary short reflecting on what we discover or lose while walking a forest path.",
    details: [
      "Official Selection, Korean Competition (Shorts), 15th DMZ International Documentary Film Festival (2023)",
      "Screened, 2nd Banjjak Documentary Festival (2024)",
      "Official Selection, Short Film Competition, 4th Seongbuk Cheongchun Bulpae Film Festival (2024)",
    ],
    links: [
      { label: "Watch on YouTube", url: "https://youtu.be/2NYD9IhMjkU" },
      { label: "DMZ Docs", url: "https://dmzdocs.com/kor/addon/00000002/history_film_view.asp?m_idx=102855&QueryYear=2023" },
    ],
  },
];
/* --- Publications & talks (Research) ------------------------ */
const publications = [
  {
    year: "2026",
    title:
      "Quantum Memory Space: A Model of Superposition and Observation in Place Memory and Its Visual Implementation",
    authors: "Dana Kim",
    venue: "Master's thesis, Graduate School of Metaverse, KAIST",
    desc: "Master's Thesis, Graduate School of Metaverse, KAIST.",
    tag: "Master's Thesis",
    link: "https://library.kaist.ac.kr/search/ctlgSearch/posesn/view.do?bibctrlno=1178931&se=t0&ty=B",
    abstract:
      "This thesis proposes Quantum Memory Space (QMS), a model that draws on the concepts of superposition and observation in quantum mechanics to represent place memory as a state in which multiple memory components latently coexist and manifest differently depending on the conditions of observation. In place, memories surface anew each time, shaped by the present context, yet existing digital media organize memory as fixed files and folder entries. Attending to this gap, the thesis explores a media form that reconnects personal archives with the experience of remembering in place. To this end, the QMS model is applied to the superposition of scenes. Scenes of the same place recorded at different times are trained together in 3D Gaussian Splatting so that their superposition becomes visible. The visualization proceeds in three forms of viewpoint-conditioned observation, emotion-based scene construction, and viewpoint-conditioned observation combined with emotion-based visual modulation. The model is realized as a practice case built on the researcher's personal records of Seoul's Gyeongui Line Forest Park, where memories have accumulated over several years. A first-person analysis follows, taking the experience of walking in the actual place as a baseline and comparing how remembering is shaped under the three media conditions of photographs, video, and QMS. QMS lets the multiple times of a place coexist in a latent state, to be encountered anew within present perception.",
  },
  {
    year: "2025",
    title: "Voice of NObody: AI Voice and the Performativity of Absence in Documentary Theatre",
    authors: "Dana Kim, J. Her",
    venue: "TaPRA 2025 Annual Conference (Theatre and Performance Research Association), University of Warwick, 27–29 Aug 2025",
    desc: "TaPRA 2025 (Theatre and Performance Research Association), University of Warwick, 27–29 Aug 2025",
    tag: "Conference Presentation",
    link: "",
    abstract: "The talk asks how documentary theatre can stage records whose subjects are absent, and proposes AI voice as a proxy without a body. Voices that sound human yet keep a trace of otherness create a familiar-strange distance, close to Brecht's alienation effect, that invites audiences to engage critically with documentary fact. The experimental piece Voice of NObody (2025) lets AI voices, rendered through a multi-speaker system, lead a performance built from the personal records of three real people, extending the proxy logic of Rimini Protokoll's Conference of the Absent (2021) into technological mediation. Presented by Dana Kim in Open Panels 2, Telling Times: Multiform Disruption and Documentary Practices.",
  },
  {
    year: "2025",
    title: "Mourning Dew: Storytelling of Nectar Ritual Painting through the Digital Moktak",
    authors: "Dana Kim, Y. Choi, J. Lee",
    venue: "Proceedings of ISEA 2025, the 30th International Symposium on Electronic Art, Seoul, pp. 554–559",
    desc: "Kim, D., Choi, Y., & Lee, J. · Proceedings of ISEA 2025 (International Symposium on Electronic Art), 554–559",
    tag: "Conference Paper",
    link: "https://www.isea-symposium-archives.org/wp-content/uploads/2025/09/2025_Kim_Mourning-Dew-Storytelling-of-Nectar-Ritual-Painting-through-the-Digital-Moktak.pdf",
    abstract:
      "This paper examines Nectar Ritual Painting, also known as Gamnodo, a genre of Korean Buddhist painting originally intended to guide the liberation of wandering spirits through ceremonial practices. Over time, Gamnodo expanded to reflect secular and societal dimensions, offering a rich narrative of the daily realities and cultural transformations of its era. Building on this tradition, the paper focuses on Mourning Dew (2024, Single Channel Video, 1'39\"), a video piece that collages imagery from two Gamnodo paintings and maps it onto the surface of a digitally rendered moktak, a wooden percussion instrument in Buddhism. This project creates a ceremonial digital experience, bridging spiritual heritage with contemporary media. The reimagination of Gamnodo in this project demonstrates how traditional art forms can be transformed into modern storytelling while preserving and revitalizing their original cultural context and purpose in the digital age.",
  },
];
/* --- Activities --------------------------------------------- */
const activities = [
  {
    year: "2026",
    title: "Teaching Assistant - 2026 KAIST–MIT Quantum Information Winter School",
    desc: "KAIST, Daejeon · 5–16 Jan 2026",
    tag: "Academic Activity",
    link: "https://www.youtube.com/watch?v=xVER_JpaYEw",
  },
];
/* --- Funded projects ---------------------------------------- */
const projects = [
  {
    year: "2026",
    title:
      "Art×Technology Convergence Project - Follow-up Support",
    tag: "Funded Project",
    meta: "MCST · KAMS · Arts Korea Lab · 2026",
    credit: "Hosted by the Ministry of Culture, Sports and Tourism · Organized by Korea Arts Management Service and Arts Korea Lab",
    desc: "Selected for Arts Korea Lab's Art×Technology Convergence Project follow-up support, funding the production and exhibition of a sequel to the 2025 work.",
  },
  {
    year: "2025",
    title: "Art×Technology Super Testbed",
    tag: "Funded Project",
    meta: "MCST · KAMS · Arts Korea Lab · Dynamic XR Lab · 2025",
    credit: "Hosted by the Ministry of Culture, Sports and Tourism · Organized by Korea Arts Management Service and Arts Korea Lab · Dynamic XR Lab",
    desc: "Selected for Arts Korea Lab's Art×Technology Super Testbed program; received training at the Dynamic XR Lab and produced and exhibited an art×technology convergence prototype.",
  },
  {
    year: "2025",
    title:
      "Quantum Memory Space: Using Moiré Patterns in 2D Materials to Enable a Metaverse of Digital Memory",
    tag: "Funded Research",
    meta: "KAIST Office of Research · Master's & Ph.D. Adventurous Research Program · Apr–Nov 2025",
    image: "assets/works/qms-moire-5.jpg",
    images: ["assets/works/qms-moire-4.jpg", "assets/works/qms-moire-generation.jpg", "assets/works/qms-moire-nebula.jpg"],
    details: ["With Yang-Geun Joo, MS–PhD student, Department of Physics, KAIST"],
    keywords: ["Moiré Pattern", "Quantum Art", "Memory Space", "Memory Visualization", "Collective Remembering"],
    desc: "This research takes the moiré superposition found in quantum physics as a structural concept and systematizes, as a Quantum Memory Space, the process by which collective memory around a particular place and event forms through the superposition of scenes and emotions. Memory is treated not as a fixed record but as a process whose structure emerges through observation and interaction, and that structure is proposed as a visualization framework that can be tested in a metaverse environment.",
  },
];
/* ============================================================
   Helpers used by js/site.js
   ============================================================ */
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}
const AUTHOR_NAMES = ["Kim, D.", "Dana Kim", "김단아"];
function boldAuthor(html) {
  return AUTHOR_NAMES.reduce(
    (out, name) => out.split(name).join(`<strong>${name}</strong>`),
    html
  );
}