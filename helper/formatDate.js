import { format, parseISO } from "date-fns";

export const formatDate = (date, formatDate = "dd MMMM yyyy HH:mm:ss") => {
  return format(parseISO(date), formatDate);
};
