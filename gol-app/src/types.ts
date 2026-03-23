// interface IGrid {
//   title: string;
//   owner: string;
//   liveCells: number[][];
//   width: number;
//   height: number;
//   created_at: string;
//   avg_rating: number;
// }

interface IPaginatedGridList {
  count: number;
  next: string;
  previous: string;
  results: [];
}
interface IGrid {
  url: string;
  id: number;
  owner: string;
  title: string;
  live_cells: number[][];
  width: number;
  height: number;
  created_at: string;
  avg_rating: number;
}
export type { IGrid, IPaginatedGridList };
