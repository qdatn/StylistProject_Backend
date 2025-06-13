export default interface AnalyticsDataDto {
  topStyles: { item: string; count: number }[];
  popularColors: { item: string; count: number }[];
  sizeDistribution: {
    top: Record<string, number>;
    bottom: Record<string, number>;
    shoe: Record<string, number>;
  };
  shoppingHabits: {
    places: { item: string; count: number }[];
    frequencies: Record<string, number>;
  };
  trendFollowing: Record<string, number>;
  brandPreferences: { brand: string; count: number }[];
  totalUsers: number;
  lastUpdated: string;
}
