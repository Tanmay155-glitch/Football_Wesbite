// Data layer — all static JSON for the website

export interface Player {
    id: number;
    name: string;
    number: number;
    position: 'GK' | 'DEF' | 'MID' | 'FWD';
    department: string;
    year: string;
    imageUrl: string;
    goals?: number;
    assists?: number;
    appearances?: number;
    rating?: number;
    nationality?: string;
    description?: string;
}

export interface Match {
    id: number;
    date: string;
    opponent: string;
    venue: 'Home' | 'Away' | 'Neutral';
    competition: string;
    homeScore?: number;
    awayScore?: number;
    isUpcoming: boolean;
    time?: string;
    description?: string;
}

export interface Trophy {
    id: number;
    title: string;
    year: number;
    competition: string;
    icon: string;
    description: string;
}

export interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    imageUrl: string;
}

export interface FormationPlayer {
    id: number;
    name: string;
    number: number;
    x: number; // percentage of field width (0-100)
    y: number; // percentage of field height (0-100)
    position: string;
}

export type FormationKey = '4-4-2' | '4-3-3' | '3-5-2';

export interface StandingsTeam {
    rank: number;
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    points: number;
    form: ('W' | 'D' | 'L')[];
    isUs?: boolean;
}

// ─── Players ───────────────────────────────────────────────────────────────
export const players: Player[] = [
    { id: 1, name: 'Siddhesh Jadhav', number: 1, position: 'GK', department: 'Computer Science Engineering', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80', appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Agile shot-stopper and calm distributor. Ready to guard the net for the new season.' },
    { id: 2, name: 'Varad Ahire', number: 2, position: 'DEF', department: 'Artificial Intelligence & Machine Learning', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&q=80', appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Solid right-back with excellent crossing ability and defensive awareness.' },
    { id: 3, name: 'Aayush Surwase', number: 3, position: 'DEF', department: 'Artificial Intelligence & Machine Learning', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&q=80', appearances: 17, rating: 7.4, goals: 8, assists: 3, nationality: 'Maharashtra', description: 'Versatile full-back who can play on either flank with pace and technical ability.' },
    { id: 4, name: 'Tanmay Gawali', number: 4, position: 'DEF', department: 'Artificial Intelligence & Machine Learning', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80', appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Commanding centre-back with excellent aerial ability and leadership qualities.' },
    { id: 5, name: 'Digambar Mahajan', number: 5, position: 'DEF', department: 'Artificial Intelligence & Machine Learning', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80', appearances: 15, rating: 7.1, goals: 7, assists: 2, nationality: 'Maharashtra', description: 'Strong centre-back known for his defensive solidity and set-piece threat.' },
    { id: 6, name: 'Swapnil Kankrale', number: 6, position: 'DEF', department: 'Artificial Intelligence & Machine Learning', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&q=80', appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Reliable full-back who can operate on both flanks with consistent performances.' },
    { id: 7, name: 'Auti Ajit', number: 7, position: 'MID', department: 'Computer Science Engineering', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Versatile midfielder who can play in central midfield or drop back to centre-back when needed.' },
    { id: 8, name: 'Dawange Abhijit', number: 8, position: 'MID', department: 'Artificial Intelligence & Data Science', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Dynamic midfielder with excellent passing range and work rate.' },
    { id: 9, name: 'Harsh Dere', number: 9, position: 'MID', department: 'Artificial Intelligence & Machine Learning', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80', goals: 6, assists: 5, appearances: 17, rating: 7.4, nationality: 'Maharashtra', description: 'Creative midfielder with great vision and ability to control the tempo of the game.' },
    { id: 10, name: 'Samarth Pawar', number: 10, position: 'MID', department: 'Artificial Intelligence & Data Science', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Central midfielder with excellent ball distribution and leadership on the pitch.' },
    { id: 11, name: 'Vardan S S', number: 11, position: 'MID', department: 'Cyber Security', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Right midfielder with pace and crossing ability, creates chances from wide areas.' },
    { id: 12, name: 'Harshwardhan Dahatonde', number: 12, position: 'MID', department: 'Internet of Things', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Left midfielder who provides width and defensive stability on the flank.' },
    { id: 13, name: 'Shreyas Shinde', number: 13, position: 'MID', department: 'Computer Science Engineering', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Right midfielder with good dribbling skills and ability to cut inside.' },
    { id: 14, name: 'Dewang Gorhe', number: 14, position: 'FWD', department: 'Artificial Intelligence & Machine Learning', year: '3rd Year', imageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80', goals: 15, assists: 4, appearances: 18, rating: 8.5, nationality: 'Maharashtra', description: 'Clinical striker. Ready to lead the line for the inaugural season.' },
    { id: 15, name: 'Rohit Thorat', number: 15, position: 'FWD', department: 'Artificial Intelligence & Data Science', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&q=80', goals: 12, assists: 6, appearances: 17, rating: 8.1, nationality: 'Maharashtra', description: 'Pacey left winger with excellent dribbling skills and ability to score from wide positions.' },
    { id: 16, name: 'Sahil Pangavhane', number: 16, position: 'FWD', department: 'Artificial Intelligence & Data Science', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80', goals: 3, assists: 5, appearances: 15, rating: 7.2, nationality: 'Maharashtra', description: 'Right wing forward with pace and crossing ability, creates opportunities for teammates.' },
    { id: 17, name: 'Aditya Kotame', number: 17, position: 'FWD', department: 'Artificial Intelligence & Data Science', year: '2nd Year', imageUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&q=80', goals: 0, assists: 0, appearances: 0, rating: 0, nationality: 'Maharashtra', description: 'Left winger with good pace and ability to track back defensively when needed.' },
];

// ─── Matches ───────────────────────────────────────────────────────────────
export const matches: Match[] = [
    { id: 1, date: '2026-03-15', opponent: 'SPPU Challengers', venue: 'Home', competition: 'Zonal Cup', isUpcoming: true, time: '15:00' },
    { id: 2, date: '2026-03-22', opponent: 'MIT Pune Warriors', venue: 'Away', competition: 'Inter-University League', isUpcoming: true, time: '14:30' },
    { id: 3, date: '2026-04-05', opponent: 'VIT University FC', venue: 'Home', competition: 'Inter-University League', isUpcoming: true, time: '16:00' },
    { id: 4, date: '2026-04-19', opponent: 'Symbiosis Lions', venue: 'Neutral', competition: 'State Cup Semi-Final', isUpcoming: true, time: '18:00' },
];

// ─── League Table ──────────────────────────────────────────────────────────
export const leagueTable: StandingsTeam[] = [
    { rank: 1, name: 'Sanjivani FC', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [], isUs: true },
    { rank: 2, name: 'SPPU Challengers', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 3, name: 'MIT Pune Warriors', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 4, name: 'VIT University FC', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 5, name: 'Symbiosis Lions', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 6, name: 'DY Patil FC', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 7, name: 'COEP Thunder', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
    { rank: 8, name: 'Bharati Vidyapeeth', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, form: [] },
];

// ─── Trophies ──────────────────────────────────────────────────────────────
export const trophies: Trophy[] = [];

// ─── News ──────────────────────────────────────────────────────────────────
export const newsItems: NewsItem[] = [
    { id: 1, title: 'Dev Kapoor Scores Hat-Trick in Zonal Victory', category: 'Match Report', date: '2026-02-28', excerpt: 'Star forward Dev Kapoor delivered a sensational hat-trick as Sanjivani FC dismantled Pune Univ Strikers 3-1.', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80' },
    { id: 2, title: 'New Training Ground Opens at South Campus', category: 'Club News', date: '2026-02-20', excerpt: 'A state-of-the-art floodlit training pitch has been inaugurated at the south campus, giving the team year-round training capability.', imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80' },
    { id: 3, title: 'Trials Open for 2026-27 Season', category: 'Recruitment', date: '2026-02-10', excerpt: 'Applications are now open for all enrolled Sanjivani University students. Trials will be held on March 30th.', imageUrl: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=80' },
    { id: 4, title: 'Coach Ramesh Yadav Extends Contract Until 2028', category: 'Club News', date: '2026-01-25', excerpt: 'The university confirms its commitment to the football program with a multi-year extension for Head Coach Ramesh Yadav.', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80' },
];

// ─── Formations ────────────────────────────────────────────────────────────
export const formations: Record<FormationKey, FormationPlayer[]> = {
    '4-4-2': [
        { id: 1, name: 'Siddhesh Jadhav', number: 1, position: 'GK', x: 50, y: 5 },
        { id: 2, name: 'Varad Ahire', number: 2, position: 'RD', x: 80, y: 28 },
        { id: 3, name: 'Tanmay Gawali', number: 4, position: 'CD', x: 60, y: 25 },
        { id: 4, name: 'Digambar Mahajan', number: 5, position: 'CD', x: 40, y: 25 },
        { id: 5, name: 'Aayush Surwase', number: 3, position: 'LD', x: 20, y: 28 },
        { id: 6, name: 'Vardan S S', number: 11, position: 'RM', x: 80, y: 52 },
        { id: 7, name: 'Samarth Pawar', number: 10, position: 'CM', x: 60, y: 50 },
        { id: 8, name: 'Auti Ajit', number: 7, position: 'CM', x: 40, y: 50 },
        { id: 9, name: 'Harshwardhan Dahatonde', number: 12, position: 'LM', x: 20, y: 52 },
        { id: 10, name: 'Dewang Gorhe', number: 14, position: 'ST', x: 62, y: 74 },
        { id: 11, name: 'Rohit Thorat', number: 15, position: 'ST', x: 38, y: 74 },
    ],
    '4-3-3': [
        { id: 1, name: 'Siddhesh Jadhav', number: 1, position: 'GK', x: 50, y: 5 },
        { id: 2, name: 'Varad Ahire', number: 2, position: 'RD', x: 80, y: 28 },
        { id: 3, name: 'Tanmay Gawali', number: 4, position: 'CD', x: 60, y: 25 },
        { id: 4, name: 'Digambar Mahajan', number: 5, position: 'CD', x: 40, y: 25 },
        { id: 5, name: 'Aayush Surwase', number: 3, position: 'LD', x: 20, y: 28 },
        { id: 6, name: 'Shreyas Shinde', number: 13, position: 'CM', x: 70, y: 50 },
        { id: 7, name: 'Samarth Pawar', number: 10, position: 'CM', x: 50, y: 48 },
        { id: 8, name: 'Dawange Abhijit', number: 8, position: 'CM', x: 30, y: 50 },
        { id: 9, name: 'Dewang Gorhe', number: 14, position: 'CF', x: 50, y: 74 },
        { id: 10, name: 'Sahil Pangavhane', number: 16, position: 'RW', x: 80, y: 70 },
        { id: 11, name: 'Rohit Thorat', number: 15, position: 'LW', x: 20, y: 70 },
    ],
    '3-5-2': [
        { id: 1, name: 'Siddhesh Jadhav', number: 1, position: 'GK', x: 50, y: 5 },
        { id: 2, name: 'Tanmay Gawali', number: 4, position: 'CD', x: 65, y: 25 },
        { id: 3, name: 'Digambar Mahajan', number: 5, position: 'CD', x: 50, y: 22 },
        { id: 4, name: 'Auti Ajit', number: 7, position: 'CD', x: 35, y: 25 },
        { id: 5, name: 'Varad Ahire', number: 2, position: 'RWB', x: 88, y: 48 },
        { id: 6, name: 'Vardan S S', number: 11, position: 'CM', x: 70, y: 50 },
        { id: 7, name: 'Samarth Pawar', number: 10, position: 'CM', x: 50, y: 46 },
        { id: 8, name: 'Harsh Dere', number: 9, position: 'CM', x: 30, y: 50 },
        { id: 9, name: 'Aayush Surwase', number: 3, position: 'LWB', x: 12, y: 48 },
        { id: 10, name: 'Dewang Gorhe', number: 14, position: 'ST', x: 62, y: 74 },
        { id: 11, name: 'Rohit Thorat', number: 15, position: 'ST', x: 38, y: 74 },
    ],
};

// ─── Coach ─────────────────────────────────────────────────────────────────
export const coach = {
    name: 'Neha Koli',
    title: 'Head Coach',
    imageUrl: '/coach-neha.jpg',
    bio: `Coach Neha Koli joined Sanjivani University in 2024, bringing fresh tactical perspectives and a strong developmental focus to the program. She has extensive experience coaching across multiple levels, notably serving as the U-17 & 19 girls' Maharashtra team coach and the U-17 Subroto Maharashtra girls' team coach. Player she has trained and coached at these levels is a national-level athlete.

    Her coaching philosophy centers on holistic player development and tactical discipline, ensuring that athletes excel both individually and as a cohesive unit.

    Contact
    For any inquiries regarding the football program or player development, you can reach Coach Neha at:

    Email: nehakoli987@gmail.com`,
    philosophy: 'Football is 90 minutes of chess at full sprint. My goal is to build players who can think fast, move faster, and never stop learning — on the pitch and in the classroom.',
    stats: [
        { label: 'Years Coaching', value: 2 },
        { label: 'Match Wins', value: 11 },
        { label: 'Trophies & Medals', value: 7 },
        { label: 'Players Developed', value: 80 },
    ],
    certifications: ['NSNIS Diploma in Football from SAI Kolkata', 'AFC C Licence', 'AIFF D Licence'],
};

// ─── Gallery Images ────────────────────────────────────────────────────────
export const galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', caption: 'Zonal Cup Victory Celebration', category: 'Celebration' },
    { id: 2, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', caption: 'Match vs SPPU — Zonal Cup', category: 'Match' },
    { id: 3, url: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=800&q=80', caption: 'Pre-Season Training Camp', category: 'Training' },
    { id: 4, url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', caption: 'Home Ground — Sanjivani Stadium', category: 'Stadium' },
    { id: 5, url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', caption: 'Goalkeeper Training Drill', category: 'Training' },
    { id: 6, url: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80', caption: 'Goal Celebration vs DY Patil', category: 'Match' },
    { id: 7, url: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80', caption: 'Trophy Presentation Ceremony', category: 'Celebration' },
    { id: 8, url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80', caption: 'Tactical Briefing with Coach Yadav', category: 'Training' },
    { id: 9, url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80', caption: 'Away Kit Reveal — 2025/26 Season', category: 'Club' },
    { id: 10, url: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=800&q=80', caption: 'Sprint Training Session', category: 'Training' },
    { id: 11, url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80', caption: 'State Cup Semi-Final 2024', category: 'Match' },
    { id: 12, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', caption: 'Captain lifting Zonal Trophy', category: 'Celebration' },
];
