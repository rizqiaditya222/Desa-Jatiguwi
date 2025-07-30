// components/common/InfoCardGroup.tsx
import StatCard from "./statcard";

interface DukuhCardProps {
  name: string;
  stats: { title: string; value: string | number; bg?: boolean }[];
}

const InfoCardGroup: React.FC<DukuhCardProps> = ({ name, stats }) => {
  return (
    <div className="rounded-xl flex flex-col w-full p-8 text-center bg-white text-[#0E4D45] shadow-md mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">{name}</h1>
      <div className="grid w-full grid-cols-2 gap-2">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            bg={item.bg}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoCardGroup;
