import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {};

async function SettingPage({}: Props) {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}

export default SettingPage;
