export const calcPercantage = (thisMonth: number, lastMonth: number) => {
  if (lastMonth == 0) return thisMonth * 100;
  let per = (thisMonth / lastMonth) * 100;
  return per.toFixed(0);
};

interface DocumentCustom extends Document {
  createdAt: Date;
  discount: number;
}

export const findPer = ({
  length,
  data,
  property,
}: {
  length: number;
  data: DocumentCustom[] | any;
  property?: string;
}) => {
  const dataArr = new Array(length).fill(0);
  const today = new Date();

  data.forEach((order: DocumentCustom) => {
    const createionDate = order.createdAt;
    const monthDeff = (today.getMonth() - createionDate.getMonth() + 12) % 12;

    if (monthDeff < length) {
      if (property) {
        dataArr[length - monthDeff - 1] += order?.[property]
          ? order?.[property]
          : 1;
      } else {
        dataArr[length - monthDeff - 1] += 1;
      }
    }
  });

  return dataArr;
};
