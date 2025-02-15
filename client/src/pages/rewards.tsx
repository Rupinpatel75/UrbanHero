import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

interface Reward {
  id: number;
  title: string;
  points: number;
  image: string;
}

const mockRewards: Reward[] = [
  {
    id: 1,
    title: "Free Bus Pass",
    points: 100,
    image: "https://placehold.co/200x200",
  },
  {
    id: 2,
    title: "Movie Tickets",
    points: 150,
    image: "https://placehold.co/200x200",
  },
  {
    id: 3,
    title: "Shopping Voucher",
    points: 200,
    image: "https://placehold.co/200x200",
  },
  {
    id: 4,
    title: "Restaurant Coupon",
    points: 250,
    image: "https://placehold.co/200x200",
  },
];

export default function Rewards() {
  const { data: userPoints } = useQuery({
    queryKey: ["/api/user/points"],
    queryFn: () => ({ total: 10, last: 5 }),
  });

  const { data: rewards = mockRewards } = useQuery({
    queryKey: ["/api/rewards"],
  });

  if (!userPoints) return null;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Rewards</h1>
        <p className="text-muted-foreground">
          Earn points by taking responsible actions and redeem rewards!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userPoints.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Last Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userPoints.last}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Badge variant="secondary" className="mr-2">
                  +5
                </Badge>
                Submitted a case report
              </li>
              <li className="flex items-center text-sm">
                <Badge variant="secondary" className="mr-2">
                  +5
                </Badge>
                Helped verify a report
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-6">Available Rewards</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <CardContent className="pt-6">
              <div className="aspect-square rounded-lg bg-muted mb-4 flex items-center justify-center">
                <Gift className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{reward.title}</h3>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{reward.points} points</Badge>
                <button
                  className="text-sm text-primary hover:underline"
                  disabled={userPoints.total < reward.points}
                >
                  Redeem
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
