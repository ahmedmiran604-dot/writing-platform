export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  authorName: string;
  authorUsername: string;
  content: string[];
};

export type Author = {
  username: string;
  name: string;
  bio: string;
  postCount: number;
  followerCount: number;
};

export const posts: Post[] = [
  {
    slug: "brishtir-shobdo",
    title: "বৃষ্টির শব্দ",
    excerpt:
      "শহরের কোলাহলের মাঝে এক টুকরো নীরবতা খুঁজে পাওয়ার গল্প, যেখানে বৃষ্টি হয়ে ওঠে স্মৃতির ভাষা।",
    category: "গল্প",
    date: "২৮ আগস্ট, ২০২৬",
    readMinutes: 6,
    authorName: "তানভীর হাসান",
    authorUsername: "tanvir-hasan",
    content: [
      "জানালার পাশে দাঁড়িয়ে থাকা মানুষটার চোখে তখনও গতকালের ক্লান্তি লেগে ছিল। শহরটা ভিজে যাচ্ছিল ধীরে ধীরে, আর তার সাথে ভিজে যাচ্ছিল কিছু পুরনো কথা, যেগুলো সে বহুদিন বলার সাহস করেনি।",
      "বৃষ্টি নামলেই তার মনে পড়ে যায় ছোটবেলার সেই টিনের চালার শব্দ, যেখানে প্রতিটা ফোঁটা যেন আলাদা একটা গল্প বলত। এখন কংক্রিটের শহরে বৃষ্টি নিঃশব্দে আসে, নিঃশব্দে চলে যায়।",
      "তবু আজ, এই মুহূর্তে, সে ঠিক করল—কিছু একটা লিখবে। কারণ কিছু শব্দ শুধু বৃষ্টির দিনেই মাথায় আসে, আর সেগুলো ধরে রাখতে না পারলে হারিয়ে যায় চিরতরে।",
    ],
  },
  {
    slug: "ekjon-shikkhoker-diary",
    title: "একজন শিক্ষকের ডায়েরি",
    excerpt:
      "টিউশনি করানো এক শিক্ষার্থীর চোখে দেখা বাংলাদেশের শিক্ষাব্যবস্থার ছোট্ট একটা ছবি।",
    category: "প্রবন্ধ",
    date: "২ সেপ্টেম্বর, ২০২৬",
    readMinutes: 8,
    authorName: "নুসরাত জাহান",
    authorUsername: "nusrat-jahan",
    content: [
      "প্রতিদিন বিকেলে যখন আমি ছাত্রছাত্রীদের পড়াতে বসি, তখন বুঝতে পারি আমাদের শিক্ষাব্যবস্থার আসল চ্যালেঞ্জটা বইয়ের ভেতরে নেই—আছে সেই ছেলেমেয়েদের চোখের ভাষায়, যারা প্রশ্ন করতে ভয় পায়।",
      "একটা প্রশ্ন যদি ভুলও হয়, তবু সেটা করার সাহসটাই আসলে শেখার প্রথম ধাপ। আমরা যদি সেই সাহসটা ধরে রাখতে পারি, তাহলেই বদল সম্ভব।",
    ],
  },
  {
    slug: "purono-boi-er-ghran",
    title: "পুরনো বইয়ের ঘ্রাণ",
    excerpt:
      "নীলক্ষেতের ফুটপাতে পুরনো বই খুঁজে বেড়ানো এক পাঠকের আত্মকথন।",
    category: "স্মৃতিচারণ",
    date: "৫ সেপ্টেম্বর, ২০২৬",
    readMinutes: 5,
    authorName: "রাফিউল ইসলাম",
    authorUsername: "rafiul-islam",
    content: [
      "নীলক্ষেতের সেই সরু গলিতে হাঁটতে হাঁটতে পুরনো বইয়ের যে গন্ধটা নাকে আসে, তার সাথে আর কোনো কিছুর তুলনা হয় না। প্রতিটা পাতায় লেগে থাকে আগের মালিকের হাতের ছোঁয়া।",
      "কিছু বই হয়তো কেউ কখনো শেষ করেনি, কিছু বইয়ের মার্জিনে লেখা থাকে অচেনা কারো নোট। এই সব ছোট ছোট চিহ্নই বইকে করে তোলে অনন্য।",
    ],
  },
  {
    slug: "digital-jibon-o-nirjonota",
    title: "ডিজিটাল জীবন ও নির্জনতা",
    excerpt: "প্রতিনিয়ত নোটিফিকেশনের ভিড়ে একা থাকার সময়টুকু কীভাবে হারিয়ে যাচ্ছে।",
    category: "মতামত",
    date: "৯ সেপ্টেম্বর, ২০২৬",
    readMinutes: 7,
    authorName: "তানভীর হাসান",
    authorUsername: "tanvir-hasan",
    content: [
      "ফোনের স্ক্রিন বন্ধ করেও মাথার ভেতর নোটিফিকেশনের শব্দ থেমে থাকে না। আমরা ক্রমশ ভুলে যাচ্ছি একা বসে থাকার, চুপচাপ ভাবনার সেই পুরনো অভ্যাসটা।",
      "হয়তো লেখালেখিই এখনও এমন একটা জায়গা, যেখানে আমরা নিজের সাথে সত্যিকারের কথা বলতে পারি, কোনো নোটিফিকেশন ছাড়াই।",
    ],
  },
  {
    slug: "grameen-mela",
    title: "গ্রামের মেলা",
    excerpt: "শৈশবের বৈশাখী মেলার রঙিন স্মৃতি, যা এখনো মনে দাগ কেটে আছে।",
    category: "স্মৃতিচারণ",
    date: "১১ সেপ্টেম্বর, ২০২৬",
    readMinutes: 4,
    authorName: "নুসরাত জাহান",
    authorUsername: "nusrat-jahan",
    content: [
      "মেলার মাঠে ঢোকার সাথে সাথে মুড়ি-মুড়কির গন্ধ, নাগরদোলার ক্যাঁচক্যাঁচ শব্দ—সব মিলিয়ে এক অন্যরকম উৎসব। আমরা কয়েক টাকা নিয়ে সারাদিন ঘুরে বেড়াতাম।",
    ],
  },
];

export const authors: Record<string, Author> = {
  "tanvir-hasan": {
    username: "tanvir-hasan",
    name: "তানভীর হাসান",
    bio: "ঢাকায় থাকি, লিখি শহর আর মানুষ নিয়ে। দিনের বেলা চাকরি, রাতে লেখালেখি।",
    postCount: 2,
    followerCount: 128,
  },
  "nusrat-jahan": {
    username: "nusrat-jahan",
    name: "নুসরাত জাহান",
    bio: "শিক্ষার্থীদের পড়াই, আর অবসরে লিখি শিক্ষা আর ছোটবেলার গল্প।",
    postCount: 2,
    followerCount: 94,
  },
  "rafiul-islam": {
    username: "rafiul-islam",
    name: "রাফিউল ইসলাম",
    bio: "বইপোকা, পুরনো বই আর পুরনো গল্পের খোঁজে ঘুরে বেড়াই।",
    postCount: 1,
    followerCount: 61,
  },
};

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByAuthor(username: string) {
  return posts.filter((p) => p.authorUsername === username);
}
