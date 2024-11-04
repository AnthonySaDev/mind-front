"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import ItemMenu from "../itemMenu";
import { axiosConfig } from "../../../../ultils/axios";
import { IUser } from "./ITypes";


interface IItemMenu {
  label: string,
  icon: string,
  path: string,
  fineshed: boolean,
  subMenu: Array<{
    label: string,
    icon: string,
    path: string
    fineshed: boolean,
  }>
}



export default function GlobalMenu() {
  const navigate = useNavigate();

  const [userData, setDataUser] = useState<IUser>();

  useEffect(() => {
    findUser();
  }, []); 

  async function findUser() {
    try {
      const { data } = await axiosConfig("/account");
  
      setDataUser(data.data);
    }catch(error) {
      console.error(error);
    }
  }

  const menu1: Array<IItemMenu> = [
    {
      label: "Dashboard",
      icon: "/menu/deshboard.svg",
      path: "/",
      subMenu: [],
      fineshed: false,
    },
    {
      label: "Estratégico",
      icon: "/menu/strategic.svg",
      path: "/strategic",
      fineshed: true,
      subMenu: [
        {
          label: "Indicadores",
          icon: "/icons/strategic/icon-indicators.svg",
          path: "/strategic/indicators",
          fineshed: true
        },
        {
          label: "Organograma",
          icon: "/icons/strategic/icon-chart.svg",
          path: "/strategic/chart",
          fineshed: false
        },
        {
          label: "Canvas",
          icon: "/icons/strategic/icon-canvas.svg",
          path: "/strategic/canvas",
          fineshed: true
        },
        {
          label: "Código Cultural",
          icon: "/icons/strategic/icon-canvas.svg",
          path: "/strategic/culturalCode",
          fineshed: true
        },
        {
          label: "Cronograma",
          icon: "/icons/strategic/icon-timeline.svg",
          path: "/strategic/timeline",
          fineshed: true
        },
        {
          label: "Plano de ação",
          icon: "/icons/strategic/icon-action-plan.svg",
          path: "/strategic/actionPlan",
          fineshed: false
        }
      ]
    },
    {
      label: "Financeiro",
      icon: "/menu/financial.svg",
      path: "/financial",
      fineshed: true,
      subMenu: [
        {
          label: "Fluxo de caixa",
          icon: "/menu/strategic.svg",
          path: "/financial/cashFlow",
          fineshed: false
        },
        {
          label: "DRE",
          icon: "/menu/strategic.svg",
          path: "/financial/dre",
          fineshed: true
        }
      ]

    },
    {
      label: "Pessoas",
      icon: "/menu/peoples.svg",
      path: "/people",
      fineshed: true,
      subMenu: [
        {
          label: "Cargos",
          icon: "/menu/strategic.svg",
          path: "/people/positions",
          fineshed: true
        },
        {
          label: "Ranking",
          icon: "/menu/strategic.svg",
          path: "/people/ranking",
          fineshed: true
        }
      ]
    },
    {
      label: "Marketing",
      icon: "/menu/marketing.svg",
      path: "/marketing",
      subMenu: [],
      fineshed: true,
    },
    {
      label: "Documentos",
      icon: "/menu/documents.svg",
      path: "/documents/useful",
      subMenu: [
        {
          label: "Links Últeis",
          icon: "/menu/strategic.svg",
          path: "/documents/useful",
          fineshed: true
        }
      ],
      fineshed: true,
    }
  ];

  const menu2 = [
    {
      label: "Configurações",
      icon: "/menu/configs.svg",
      path: "/settings",
      selected: false
    },
    {
      label: "Modo Escuro",
      icon: "/menu/moom.svg",
      path: "/darkMode",
      selected: false
    }
  ]

  function exitAccount() {
    Cookies.remove("token-user");
    navigate("/login");
  }

  return (
    <div className={[styles.globalMenu].join(" ")}>
      
      <div className={[styles.profile, styles.base].join(" ")}>
        <img className={[styles.logo].join(" ")} src={userData?.photo ? userData.photo : "/menu/logo-menu.png"} alt="logo"/>

        <div className="info">
          <h2>{userData?.name ? userData.name : "---"}</h2> 
          <hr />
          <p>Administradora</p>
        </div>

        <button className={[styles.buttonShowMore].join(" ")}>
          <img src="/icons/arrow.svg" alt=""/>
        </button>
      </div>

      <div className={[styles.menu, styles.base].join(" ")}>
        <ul className={[styles.mainMenu].join(" ")}>

          {menu1.map(({ icon, label, path, subMenu, fineshed}, key) => {
            return (
              <ItemMenu
                title={label}
                icon={icon}
                path={path}
                list={subMenu}
                fineshed={fineshed}
              />
            )
          })}
        </ul>

        <ul className={[].join(" ")}>
          {menu2.map(({ icon, label, path, selected }, key) => {
            return (
              <li key={key} className={[selected && styles.selected].join(" ")}>
                <div>
                  <img src={icon} alt="" />
                  {label}
                </div> 
              </li>
            )
          })}

          <li 
            className={[].join(" ")}
            onClick={exitAccount}
          >
            <div>
                <img src={"/menu/exit.svg"} alt="" />
                Sair
            </div> 
          </li>
        </ul>
      </div>

    </div>
  )
}