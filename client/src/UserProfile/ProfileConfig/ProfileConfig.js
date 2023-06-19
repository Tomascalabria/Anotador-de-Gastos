// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Projects from "./components/Projects";
import { AuthContext } from "../../Context/AuthContext";

function Profile() {
  const {user}=useContext(AuthContext)
  
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );

  return (
    <Flex direction='column' w={'90%'} justifyContent={'flex-end'} alignItems={'flex-end'}> 
    <Flex w={'80%'}  direction="column">
      <Header 
        backgroundProfile={bgProfile}
        avatarImage={user.userInfo.profile_picture}
        name={user.userInfo.username}
        email={user.userInfo.email}
        tabs={[
          {
            name: "OVERVIEW",
            icon: <FaCube w='100%' h='100%' />,
          },
          {
            name: "TEAMS",
            icon: <IoDocumentsSharp w='100%' h='100%' />,
          },
          {
            name: "PROJECTS",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        <PlatformSettings
          title={"Notificaciones"}
          subtitle1={"Cuentas"}
          subtitle2={"Tenencias"}
        />
        <ProfileInformation
          title={"Datos Personales"}
          description={
              " "
          }
          name={user.userInfo.username}
          mobile={"(44) 123 1234 123"}
          email={user.userInfo.email}
          location={""}
        />
        <Conversations title={"Amigxs"} />
      </Grid>
      <Projects title={"Cuentas"} description={"Configure las cuentas que desea visualizar en el panel."} />
    </Flex>
    </Flex>
  );
}

export default Profile;
