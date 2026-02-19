import React from 'react'
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

const RatingComponent = ({value,userRating}) => {
    return (
        <div className="flex items-center  mt-2">
            <Rating
                name="size-small"
                size="small"
                value={value}
                readOnly
                // precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {
                userRating &&
                <Box sx={{ ml: 2, fontSize: "small" }}>{userRating} ratings</Box>
            }
        </div>
    )
}

export default RatingComponent