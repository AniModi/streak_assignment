import { Home, Live, Profile, Search } from "../../assets";
import { useLive } from "../../hooks/useLive";
import RoundButton from "../RoundButton/RoundButton";

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const { isLive, setIsLive } = useLive();

  const buttons = [
    {
      icon: <Search className="icon"></Search>,
      onClick: () => {},
      isActive: false,
    },
    {
      icon: <Home className="icon"></Home>,
      onClick: () => {},
      isActive: false,
    },
    {
      icon: <Profile className="icon"></Profile>,
      onClick: () => {},
      isActive: false,
    },
    {
      icon: <Live className="icon"></Live>,
      onClick: () => {
        setIsLive((prev) => !prev);
      },
      isActive: isLive,
    },
  ];

  return (
    <div className="flex w-full justify-between p-10 text-white">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Hello, {name}</div>
        <div className="text-lg text-transparent-white">{date}</div>
      </div>
      <div className="flex items-center justify-center gap-3">
        {buttons.map((ele, idx) => {
          return (
            <RoundButton
              className={ele.isActive ? "bg-positive" : ""}
              onClick={ele.onClick}
              key={idx}
            >
              {ele.icon}
            </RoundButton>
          );
        })}
      </div>
    </div>
  );
}
