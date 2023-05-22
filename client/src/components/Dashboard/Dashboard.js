import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Balances } from "./Finance/investments";
import { AuthContext } from "../../Context/AuthContext";
import Iol_logo from "../../Icons/IOL-menu.svg";
import cocos_logo from "../../Icons/logo_cocos.svg";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const companies = [
    {
      id: 1,
      name: "Cocos Capital",
      type: "Broker",
      logo: cocos_logo,
      about:
        "Cocos nace en el 2021 con la misión de lograr que TODOS puedan invertir y alcanzar así la independencia financiera. A través de una experiencia 100% digital y ágil, revolucionamos el mercado financiero ofreciendo simpleza, velocidad y un esquema totalmente disruptivo de CERO COMISIONES a los usuarios. ¡En Cocos el cliente está en el centro y lo queremos acompañar en el día a día ayudándolo/a a lograr sus objetivos!",
    },
    {
      id: 2,
      name: "Invertir Online",
      type: "Broker",
      logo: Iol_logo,
      about:
        "IOL fue fundada en mayo del 2000 y en 2018 fue adquirida por el Grupo Supervielle. Somos un miembro fundador de la Cámara Fintech. INVERTIRONLINE S.A.U. Agente de Liquidación y Compensación Propio (ALyCP) Nº 273/CNV Agente Colocador y Distribuidor Integral de Fondos Comunes de Inversión (ACyDI FCI) Nº 1/CNV Participante Bolsas y Mercados Argentinos - BYMA Nº 151 Participante Mercado Argentino de Valores - MAV Nº 047",
    },
  ];

  return (
    <Flex
      h="100vh"
      background={{ light: "#f0f0f0", dark: "#2d2f38" }}
      w="xxl"
      paddingTop="20px"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
    >
      {companies.map((company, index) => (
        <Balances key={index} company={company} />
      ))}
    </Flex>
  );
};
