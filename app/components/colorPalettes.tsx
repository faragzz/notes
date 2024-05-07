import React from "react";

const ColorPalettes = ({
  colors,
  onClickHandle,
}: {
  colors: string[];
  onClickHandle: (color: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 bg-gray-700 rounded-2xl p-2 px-4 max-w-fit">
      {colors.map((color, index) => {
        return (
          <button
            key={index}
            onClick={() => onClickHandle(color)}
            className={`${color} p-3 rounded-full`}
          />
        );
      })}
    </div>
  );
};

export default ColorPalettes;
