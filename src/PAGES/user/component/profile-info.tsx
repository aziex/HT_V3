import { Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfileInfo() {
    const { user } = useSelector((state: any) => state);
    const match = useParams();
  
    return(
      
      <Paper
      elevation={4}
      sx={{ 
        marginTop:'30px', 
        alignItems: 'flex-center', 
        }}>
          

      </Paper>
        
    );
  
};
  export default React.memo(ProfileInfo);