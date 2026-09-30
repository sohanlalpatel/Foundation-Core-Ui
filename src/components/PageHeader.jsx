import { useNavigate } from "react-router-dom";
import Button from "./Button";

function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
  showBack = true,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="
              inline-flex
              items-center
              gap-1.5
              mb-2
              text-sm
              text-slate-500
              hover:text-blue-600
              transition
            "
            >
              ← Back
            </button>
          )}

          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>

          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {actionLabel && (
          <Button onClick={onAction}>
            <span className="text-base">+</span>
            {actionLabel}
          </Button>
        )}
      </div>
    </>
  );
}

export default PageHeader;
