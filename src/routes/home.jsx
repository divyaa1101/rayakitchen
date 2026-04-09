import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpg";
import food4 from "@/assets/food-4.jpg";
import food5 from "@/assets/food5.png";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Raya's Kitchen — Home" },
      { name: "description", content: "Explore our menu, offers, and categories at Raya's Kitchen." },
    ],
  }),
});

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [offersIndex, setOffersIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(1);
  const [categoriesIndex, setCategoriesIndex] = useState(2);

  const images = [food1, food2, food3, food4, food5];

  useEffect(() => {
    const offersInterval = setInterval(() => {
      setOffersIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    const featuredInterval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    const categoriesInterval = setInterval(() => {
      setCategoriesIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(offersInterval);
      clearInterval(featuredInterval);
      clearInterval(categoriesInterval);
    };
  }, []);

  const handleCreateProfile = () => {
    if (username && email) {
      const profile = { username, email };
      localStorage.setItem("userProfile", JSON.stringify(profile));
      alert("Profile created successfully!");
      setIsLoginOpen(false);
      setUsername("");
      setEmail("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">RK</span>
            </div>
            <span className="font-bold text-lg text-foreground">RAYA'S KITCHEN</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#offers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Offers
            </a>
            <a href="#featured" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Featured
            </a>
            <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            {/* Action Buttons */}
            <Button variant="ghost" size="sm">Home</Button>
            <Button variant="ghost" size="sm">Menu</Button>
            <Button variant="ghost" size="sm">Cart</Button>
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Profile</DialogTitle>
                  <DialogDescription>
                    Enter your username and email to create a profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleCreateProfile}>Create Profile</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Single Frame Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-background to-background/95">
        {/* Offers Section */}
        <section id="offers" className="relative min-h-[500px] overflow-hidden">
          {/* Slideshow background */}
          {images.map((src, i) => (
            <img
              key={`offers-${i}`}
              src={src}
              alt=""
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: i === offersIndex ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                transform: "scale(1.05)",
              }}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Family Meal Deal
                    <Badge variant="destructive">20% OFF</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get a complete family meal with 4 main courses, sides, and desserts for just $49.99
                  </p>
                  <Button>Order Now</Button>
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Lunch Special
                    <Badge variant="secondary">Daily</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Enjoy our signature dishes at discounted prices from 11 AM to 3 PM
                  </p>
                  <Button>View Menu</Button>
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Free Delivery
                    <Badge variant="outline">New</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Free delivery on orders over $30 within 5 miles of our restaurant
                  </p>
                  <Button>Start Order</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background/20" />
        </section>

        {/* Featured Section */}
        <section id="featured" className="relative min-h-[500px] overflow-hidden">
          {/* Slideshow background */}
          {images.map((src, i) => (
            <img
              key={`featured-${i}`}
              src={src}
              alt=""
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: i === featuredIndex ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                transform: "scale(1.05)",
              }}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Butter Chicken</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Creamy, rich curry with tender chicken pieces
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">$16.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Lamb Vindaloo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Spicy Goan curry with tender lamb
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">$18.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Paneer Tikka</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Grilled cottage cheese with spices and herbs
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">$14.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Biryani</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fragrant basmati rice with meat and spices
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">$15.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

          {/* Fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background/20" />
        </section>

        {/* Categories Section */}
        <section id="categories" className="relative min-h-[500px] overflow-hidden">
          {/* Slideshow background */}
          {images.map((src, i) => (
            <img
              key={`categories-${i}`}
              src={src}
              alt=""
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: i === categoriesIndex ? 1 : 0,
                transition: "opacity 1.5s ease-in-out",
                transform: "scale(1.05)",
              }}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🍛</span>
                </div>
                <h3 className="font-semibold">Main Courses</h3>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <h3 className="font-semibold">Appetizers</h3>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🍰</span>
                </div>
                <h3 className="font-semibold">Desserts</h3>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🥤</span>
                </div>
                <h3 className="font-semibold">Beverages</h3>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>
        </div>
      </main>
    </div>
  );
}