import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shuffle, Heart, Star, Sun } from "lucide-react";

const greetingTemplates = [
  "Hello {name}! Hope you're having a wonderful day!",
  "Hi there {name}! Wishing you all the best today!",
  "Hey {name}! May your day be filled with joy and happiness!",
  "Good day {name}! Sending you positive vibes!",
  "Greetings {name}! Hope everything is going amazingly for you!",
  "Hello beautiful {name}! You're awesome and don't forget it!",
  "Hi {name}! Just wanted to brighten your day with this message!",
  "Hey there {name}! You're incredible and I hope you know it!",
  "Good morning/afternoon {name}! May your day sparkle with joy!",
  "Hello {name}! Remember, you're capable of amazing things!"
];

const greetingCategories = [
  { name: "Motivational", icon: Star, color: "bg-yellow-100 text-yellow-800" },
  { name: "Friendly", icon: Heart, color: "bg-pink-100 text-pink-800" },
  { name: "Cheerful", icon: Sun, color: "bg-orange-100 text-orange-800" }
];

const Index = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const generateGreeting = () => {
    if (!name.trim()) {
      setGreeting("Please enter a name first!");
      return;
    }
    
    const randomTemplate = greetingTemplates[Math.floor(Math.random() * greetingTemplates.length)];
    const personalizedGreeting = randomTemplate.replace("{name}", name.trim());
    setGreeting(personalizedGreeting);
    
    // Set random category for visual appeal
    const randomCategory = greetingCategories[Math.floor(Math.random() * greetingCategories.length)];
    setSelectedCategory(randomCategory.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Friendly Greeting Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Create personalized, heartwarming greetings for anyone!
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Generate Your Greeting
            </CardTitle>
            <CardDescription>
              Enter a name and we'll create a beautiful, personalized greeting message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && generateGreeting()}
                className="flex-1"
              />
              <Button onClick={generateGreeting} className="px-6">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        {greeting && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Personalized Greeting</CardTitle>
                {selectedCategory && (
                  <Badge className={greetingCategories.find(c => c.name === selectedCategory)?.color}>
                    {selectedCategory}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border-l-4 border-primary">
                <p className="text-lg leading-relaxed">{greeting}</p>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={generateGreeting} className="mt-2">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {greetingCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.name === "Motivational" && "Inspire and uplift"}
                    {category.name === "Friendly" && "Warm and welcoming"}
                    {category.name === "Cheerful" && "Bright and joyful"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
