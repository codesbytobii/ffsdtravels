import React, { useEffect, useState, useCallback } from "react";
import { Range, getTrackBackground } from "react-range";

interface RangeSliderInputProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const RangeSliderInput: React.FC<RangeSliderInputProps> = ({
  min,
  max,
  onChange,
}) => {
  const [values, setValues] = useState<[number, number]>([min, max]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleChange = useCallback(
    (values: number[]) => {
      const [newMinValue, newMaxValue] = values as [number, number];
      setValues([newMinValue, newMaxValue]);
      onChange(newMinValue, newMaxValue);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col">
      <Range
        values={values}
        step={1000}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 flex justify-between"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#E5302F", "#aaaaaa", "#E5302F"],
                min,
                max,
              }),
              borderRadius: "4px",
              height: "6px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className={`w-6 h-6 rounded-full bg-primaryRed ${
              isDragged ? "shadow-lg" : ""
            }`}
            style={{ cursor: "pointer" }}
          />
        )}
      />
      <div className="flex justify-between mt-2">
        <span>₦{values[0].toLocaleString()}</span>
        <span>₦{values[1].toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RangeSliderInput;