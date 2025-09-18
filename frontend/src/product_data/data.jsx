import accessories from "./accessories";
import footwear from "./footware";
import furniture from "./furniture";
import beauty from "./beauty";
import kids from "./kidsclothing";
import menClothing from "./menclothing";
import womenClothing from "./womenclothing";

const data = [
  ...menClothing,
  ...womenClothing,
  ...beauty,
  ...footwear,
  ...accessories,
  ...kids,
  ...furniture
];

export default data;