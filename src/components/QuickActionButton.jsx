import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

const QuickActionButton = ({
  className,
  setShowQuickActions,
  showQuickActions,
  actions = [],
  onCustomActionClick = () => {},
}) => (
  <div className={`${className} bottom-8 right-8 z-50`}>
    <button
      onClick={() => setShowQuickActions(!showQuickActions)}
      className="bg-[var(--darkgreen)] h-16 w-16 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[var(--darkergreen)] hover:cursor-pointer transition-all duration-300"
    >
      <Plus
        className={`absolute h-8 w-8 transition-opacity duration-200 ${
          showQuickActions ? "opacity-0" : "opacity-100"
        }`}
      />

      <Minus
        className={`absolute h-8 w-8 transition-opacity duration-200 ${
          showQuickActions ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>

    {showQuickActions && (
      <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-64 transform transition-all duration-300">
        <div className="flex flex-col gap-3">
          {actions.map((action, idx) =>
            action.type === "custom" ? (
              <button
                key={idx}
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    setShowQuickActions(false);
                  }
                  action.onClick ? action.onClick(e) : onCustomActionClick(e);
                }}
                className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
              >
                <action.icon className="h-6 w-6" />
                {action.text}
              </button>
            ) : (
              <Link
                key={idx}
                to={action.path}
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    setShowQuickActions(false);
                  }
                }}
                className="flex items-center gap-2 p-3 bg-[var(--darkgreen)] text-white rounded-lg hover:bg-[var(--darkergreen)] transition-colors"
              >
                <action.icon className="h-6 w-6" />
                {action.text}
              </Link>
            ),
          )}
        </div>
      </div>
    )}
  </div>
);

export default QuickActionButton;