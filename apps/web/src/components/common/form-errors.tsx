export default function FormErrors({
  pending,
  error,
  validationErrors,
}: {
  pending: boolean;
  error: string | null;
  validationErrors: string[];
}) {
  return (
    <>
      {!!error && !pending && (
        <div className="bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground">
          <p>{error}</p>
        </div>
      )}
      {!!validationErrors.length && !pending && (
        <div className="bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground">
          {validationErrors.map((error, idx) => (
            <p key={'error__' + idx + '__' + error}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
}
