import React, { useState } from "react";
import IconComponent from "./StarIcon";

const SIZES = {
    SMALL: {
        key: "s",
        size: 10
    },
    MEDIUM: {
        key: "m",
        size: 18
    },
    LARGE: {
        key: "l",
        size: 28
    }
};

const OUT_OF_VALUE = 5;

const Rating = (props) => {
    const {
        iconSize,
        ratingInPercent,
        showOutOf,
        enableUserInteraction,
        onClick
    } = props;

    const [activeStar, setActiveStar] = useState(0);
    const decimal = ratingInPercent / 20;
    const nonFraction = Math.trunc(decimal);
    const fraction = Number((decimal - nonFraction).toFixed(2));
    const fractionPercent = fraction * 100;



    const numberOfStar = OUT_OF_VALUE;
    const size =
        iconSize === SIZES.SMALL.key
            ? SIZES.SMALL.size
            : iconSize === SIZES.MEDIUM.key
                ? SIZES.MEDIUM.size
                : SIZES.LARGE.size;

    const RatingHighlighted = (
        <IconComponent type={"ratingHighlighted"} width={size} height={size} />
    );
    const RatingDefault = (
        <IconComponent type={"ratingDefault"} width={size} height={size} />
    );

    const handleClick = (index) => {
        onClick(index + 1);
        setActiveStar(index);
    };

    const showDefaultStar = (index) => {
        return RatingDefault;
    };

    let isShow = true;
    const getStar = (index) => {
        if (index <= nonFraction - 1) {
            isShow = true;
            return "100%";
        } else if (fractionPercent > 0 && isShow) {
            isShow = false;
            return `${fractionPercent}%`;
        } else {
            return "0%";
        }
    };

    const isShowOutOfStar = (index) => {
        if (showOutOf) {
            return showOutOf;
        }

        const isLoopThrough = (fraction === 0 ? nonFraction : nonFraction + 1) - 1;
        return index <= isLoopThrough;
    };

    const withoutUserInteraction = (index) => {
        return isShowOutOfStar(index) ? (
            <div style={{ position: "relative" }} key={index}>
                <div
                    style={{
                        width: getStar(index),
                        overflow: "hidden",
                        position: "absolute"
                    }}
                >
                    {RatingHighlighted}
                </div>
                {showDefaultStar(
                    showOutOf
                        ? nonFraction === 0
                            ? index < nonFraction
                            : index <= nonFraction
                        : index <= numberOfStar
                )}
            </div>
        ) : null;
    };

    const withUserInteraction = (index) => {
        return (
            <div
                style={{ position: "relative" }}
                onClick={() => handleClick(index)}
                key={index}
            >
                <div
                    style={{
                        width: index <= activeStar ? "100%" : "0%",
                        overflow: "hidden",
                        position: "absolute"
                    }}
                >
                    {RatingHighlighted}
                </div>
                {showDefaultStar()}
            </div>
        );
    };

    return (
        <div className={"rating"}>
            {[...new Array(numberOfStar)].map((arr, index) =>
                enableUserInteraction
                    ? withUserInteraction(index)
                    : withoutUserInteraction(index)
            )}
        </div>
    );
};



export default Rating;
