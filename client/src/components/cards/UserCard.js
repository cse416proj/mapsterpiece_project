import { Card, CardContent, Typography } from "@mui/material";

function UserCard({userName, clickHandler}){
    return(
        <Card className="individualDynamicCard">
            <CardContent onClick={clickHandler}>
                <Typography
                    sx={{ fontSize: 14, width: `15%` }}
                    color="black"
                    gutterBottom
                >
                    {userName}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default UserCard;