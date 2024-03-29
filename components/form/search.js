import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Search } from "react-feather";
import { SingleSelect } from "../input-field";
import { categoryList } from "../../pages/api";
import { useCallback, useEffect, useState } from "react";

const yearOptions = () => {
  const years = [];
  for (let i = 0; i < 100; i++) {
    const item = 1980 + i;
    years.push({ label: item, value: item });
  }

  return years;
};

export const SearchForm = () => {
  const history = useRouter();
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  /** fetch category list */
  const fetchCategoryList = useCallback(async () => {
    try {
      const response = await categoryList();
      if (response && response.status === 200) {
        const items = [];
        if (response.data && response.data.data && response.data.data.length) {
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            items.push({
              label: element.title,
              value: element._id,
            });
          }
        }

        setData(items);
      }
    } catch (error) {
      console.log(error?.response);
    }
  }, []);

  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);

  const onSubmit = async (data) => {
    history.push(
      `/publications?year=${data.year.value}&category=${data.category.value}&query=${data.query}`
    );
  };

  return (
    <div
      className={`rounded-full drop-shadow-xl bg-white border ${
        errors.year || errors.query ? "border-red-400" : "border-gray-100"
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          {/* Year selection */}
          <div className="w-24">
            <SingleSelect
              name={"year"}
              error={errors.year}
              isSearchable
              placeholder="Year"
              options={yearOptions()}
              control={control}
              rules={{ required: true }}
              borderTopLeftRadius="50px"
              borderBottomLeftRadius="50px"
            />
          </div>

          {/* Category selection */}
          <div className="w-36">
            <SingleSelect
              name={"category"}
              error={errors.category}
              isSearchable
              placeholder="Category"
              options={data}
              control={control}
              rules={{ required: true }}
              borderRadius={0}
            />
          </div>

          {/* Query input */}
          <div className="grow">
            <input
              type="text"
              className="w-full rounded-l-full text-md outline-none py-[15px] px-[20px] border-0 shadow-none"
              placeholder="Search researcher ..."
              {...register("query", { required: true })}
            />
          </div>

          {/* Submit button */}
          <div className="flex-none p-1">
            <button
              type="submit"
              className="p-[10px] rounded-full transition-all shadow-lg text-white bg-primary hover:bg-secondary"
            >
              <Search size={25} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
