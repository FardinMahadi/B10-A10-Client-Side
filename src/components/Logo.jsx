import logoImg from "../assets/logoImg.png";

const Logo = () => {
  return (
    <div className="flex items-center text-3xl italic">
      <img src={logoImg} className="h-5 mr-2" />
      <span className="text-red-500 font-semibold">Chill</span>Gamer
    </div>
  );
};

export default Logo;
