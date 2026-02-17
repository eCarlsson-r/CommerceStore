"use client";
import { useModel } from "@/hooks/useModel";
import { Category } from "@/lib/types";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function Sidebar() {
  const { data } = useModel("category");
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(1000000);
  return (
    <div className="left-sidebar">
      <h2
        className="text-primary text-lg font-bold text-center uppercase mb-[30px] relative"
        data-i18n="category"
      >
        Category
      </h2>
      <div
        className="panel-group category-products categorySelector submenu mb-[35px] border border-border-light pb-5 pt-[15px]"
        id="accordian"
      >
        {data.map((item: Category) => (
          <div className="panel panel-default" key={item.id}>
            <div className="panel-heading">
              <h4 className="panel-title">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="price-range">
        <h2>Price Range</h2>
        <Slider
          defaultValue={[minimumPrice, maximumPrice]}
          max={maximumPrice}
          min={minimumPrice}
          onValueChange={(value) => {
            setMinimumPrice(value[0]);
            setMaximumPrice(value[1]);
          }}
        />
      </div>
    </div>
  );
}
