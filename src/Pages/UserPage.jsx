
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import ResultTable from "../Components/ResultTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { useTheme } from "../Context/ThemeContext";
import { CircularProgress, Box, Fade } from "@mui/material";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);

  const { theme } = useTheme();

  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userID", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };

  useEffect(() => {
    if (!loading && user) {
      fetchUserData();
    }
  }, [loading]);

  if (!loading && !user) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.title,
          fontSize: "1.5rem",
          fontWeight: 500,
        }}
      >
        Login to view your profile!
      </Box>
    );
  }

  if (loading || dataLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={80} sx={{ color: theme.title }} />
      </Box>
    );
  }

  if (!loading && !dataLoading && data.length === 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.title,
          fontSize: "1.5rem",
          fontWeight: 500,
        }}
      >
        Take some tests and come back to see your stats!
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: { xs: 2, md: 5 },
        display: "flex",
        flexDirection: "column",
        gap: 5,
        backgroundColor: theme.background,
        transition: "background-color 0.5s ease",
      }}
    >
      <Fade in timeout={500}>
        <Box>
          <UserInfo totalTestTaken={data.length} />
        </Box>
      </Fade>

      <Fade in timeout={700}>
        <Box
          sx={{
            width: "100%",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            backgroundColor: theme.background,
          }}
        >
          <Graph graphData={graphData} type="date" />
        </Box>
      </Fade>

      <Fade in timeout={900}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
            backgroundColor: theme.background,
            padding: 2,
          }}
        >
          <ResultTable data={data} />
        </Box>
      </Fade>
    </Box>
  );
};

export default UserPage;
