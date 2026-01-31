import React from "react";

type LoaderProps = {
  label?: string;
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ label = "Loading...", color="bg-gradient-to-br" }) => {
  return (
    <div className={`flex h-screen items-center justify-center ${color} from-gray-900 to-gray-800`}>
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-lg font-semibold text-white">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Loader;
