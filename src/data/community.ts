export interface CommunityAward {
  id: string;
  title: string;
  description: string;
  iconName: 'Users' | 'Globe' | 'Trophy' | 'Zap';
}

export const communityAwards: CommunityAward[] = [
  {
    id: "angular-bo",
    title: "Angular Bolivia",
    description: "Community Lead & Technical Speaker. Organizing monthly meetups and workshops for 500+ developers.",
    iconName: "Users"
  },
  {
    id: "gdg-cbba",
    title: "GDG Cochabamba",
    description: "Google Developer Group contributor, focusing on Cloud and Fullstack development tracks.",
    iconName: "Globe"
  },
  {
    id: "sw-bolivia",
    title: "Startup Weekend",
    description: "1st Place Winner — Technical Track. Built a blockchain-based voting system in 54 hours.",
    iconName: "Trophy"
  },
  {
    id: "hackbo",
    title: "HackBo 2018",
    description: "Top Performer Award for innovation in real-time data synchronization across low-bandwidth networks.",
    iconName: "Zap"
  }
];
