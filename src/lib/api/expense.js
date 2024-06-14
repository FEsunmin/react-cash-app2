import axios from "axios";

const JSON_SERVER_HOST = "https://veiled-serious-reptile.glitch.me";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터가 써지지 않아요! ");
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터가 써지지 않아요! ");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터가 써지지 않아요! ");
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;

  try {
    const { data } = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터가 수정되지 않아요! ");
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터가 삭제되지 않아요! ");
  }
};
