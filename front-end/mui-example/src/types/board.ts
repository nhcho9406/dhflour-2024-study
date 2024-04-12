export type IBoardTableFilters = {
  category: string[];
  startDate: Date | null;
  endDate: Date | null;
};


export type IBoardFilterValue = string | string[] | Date | null;


export type IBoardItem = {
  id: string;
  title:string;
  category:string;
  top:boolean;
  pageView:number;
  createdTime: Date;
};
