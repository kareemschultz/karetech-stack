# 🧩 Component Library Guide

> **Complete guide to using the shadcn/ui component system in KareTech Stack applications with theme integration and best practices.**

---

## 🚀 Quick Start

```bash
# Components are auto-generated based on your theme choice
bunx create-karetech-stack my-app --theme nova

# All components are ready to use
import { Button, Card, Input } from "@/components/ui"
```

---

## 🎨 Component System Overview

### Automatic Generation

KareTech Stack automatically generates and configures the complete shadcn/ui component library based on your theme selection:

**Generated Components (45+ components):**
- ✅ **Form Controls:** Button, Input, Select, Checkbox, Radio, Switch
- ✅ **Layout:** Card, Dialog, Sheet, Tabs, Accordion, Collapsible  
- ✅ **Data Display:** Table, Badge, Avatar, Progress, Skeleton
- ✅ **Feedback:** Alert, Toast, AlertDialog, Loading States
- ✅ **Navigation:** DropdownMenu, NavigationMenu, Breadcrumb
- ✅ **Overlays:** Tooltip, Popover, HoverCard, Context Menu

### Theme Integration

Every component is automatically styled with your chosen theme:

```typescript
// Example: Button component with Nova theme + Green accent
<Button className="bg-green-600 hover:bg-green-700">
  Click Me
</Button>

// Automatically includes:
// - Theme-specific colors
// - Consistent typography  
// - Proper spacing
// - Accessibility features
// - Dark mode support
```

---

## 🔘 Form Components

### Button

```typescript
// src/components/ui/button.tsx (auto-generated)
import { Button } from "@/components/ui/button"

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With icons
<Button>
  <Github className="mr-2 h-4 w-4" />
  Sign in with GitHub
</Button>
```

### Input

```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Basic input
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email"
    type="email"
    placeholder="Enter your email"
  />
</div>

// Input variants
<Input placeholder="Default input" />
<Input type="password" placeholder="Password" />
<Input type="search" placeholder="Search..." />
<Input disabled placeholder="Disabled input" />

// With validation states
<Input 
  className="border-red-500 focus:border-red-500"
  placeholder="Error state"
/>
<Input 
  className="border-green-500 focus:border-green-500"
  placeholder="Success state"
/>
```

### Select

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>

// With form integration
<Select onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    {options.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### Form Example

```typescript
// Complete form with validation
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your message..."
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}
```

---

## 📱 Layout Components

### Card

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Feature card example
<Card className="w-full max-w-sm">
  <CardHeader className="text-center">
    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
      <Zap className="h-6 w-6 text-primary" />
    </div>
    <CardTitle>Fast Performance</CardTitle>
    <CardDescription>
      Lightning-fast builds with Bun and optimized bundling
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="flex items-center space-x-2">
      <Check className="h-4 w-4 text-green-500" />
      <span className="text-sm">Sub-second builds</span>
    </div>
    <div className="flex items-center space-x-2">
      <Check className="h-4 w-4 text-green-500" />
      <span className="text-sm">Hot module reload</span>
    </div>
  </CardContent>
</Card>
```

### Dialog

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="John Doe" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Confirmation dialog
function DeleteConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

### Tabs

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview" className="w-full">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview" className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          General information about your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Overview content goes here</p>
      </CardContent>
    </Card>
  </TabsContent>
  
  <TabsContent value="analytics">
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Analytics content</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

---

## 📊 Data Display Components

### Table

```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
]

<Table>
  <TableCaption>A list of your recent users.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// Advanced table with sorting and pagination
function DataTable<TData>({
  data,
  columns,
}: {
  data: TData[]
  columns: ColumnDef<TData>[]
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
```

### Badge

```typescript
import { Badge } from "@/components/ui/badge"

// Basic badges
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// Status badges
<Badge variant="default" className="bg-green-100 text-green-800">
  Active
</Badge>
<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
  Pending  
</Badge>
<Badge variant="destructive">
  Inactive
</Badge>

// With icons
<Badge className="gap-1">
  <Check className="h-3 w-3" />
  Verified
</Badge>
```

### Avatar

```typescript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Basic avatar
<Avatar>
  <AvatarImage src="https://github.com/johndoe.png" alt="@johndoe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar className="h-8 w-8">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar className="h-16 w-16">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

// Avatar group
<div className="flex -space-x-2">
  {users.map((user, index) => (
    <Avatar key={user.id} className="border-2 border-white">
      <AvatarImage src={user.avatar} />
      <AvatarFallback>{user.initials}</AvatarFallback>
    </Avatar>
  ))}
</div>
```

---

## 🔔 Feedback Components

### Alert

```typescript
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

// Success alert
<Alert>
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>

// Error alert
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>

// Warning alert
<Alert>
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    This action cannot be undone.
  </AlertDescription>
</Alert>

// Info alert
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>
    New features are now available in your dashboard.
  </AlertDescription>
</Alert>
```

### Toast

```typescript
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export function ToastExample() {
  const { toast } = useToast()

  return (
    <div className="space-x-2">
      <Button
        onClick={() => {
          toast({
            title: "Success",
            description: "Operation completed successfully!",
          })
        }}
      >
        Show Success Toast
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong.",
          })
        }}
      >
        Show Error Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }}
      >
        Show Action Toast
      </Button>
    </div>
  )
}
```

### Loading States

```typescript
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"

// Skeleton loading
<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-4 w-[150px]" />
</div>

// Progress bar
<Progress value={33} className="w-full" />

// Spinner
<div className="flex items-center space-x-2">
  <Spinner />
  <span>Loading...</span>
</div>

// Loading button
<Button disabled>
  <Spinner className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </CardContent>
</Card>
```

---

## 🧭 Navigation Components

### Dropdown Menu

```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      <span>Settings</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Navigation Menu

```typescript
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <NavigationMenuLink asChild>
            <a
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              href="/docs"
            >
              <div className="text-sm font-medium leading-none">Documentation</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Learn how to use our components
              </p>
            </a>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## 🎨 Custom Component Examples

### Feature Card Component

```typescript
// src/components/feature-card.tsx (custom component example)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
  features: string[]
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function FeatureCard({
  title,
  description,
  icon,
  badge,
  features,
  action
}: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden">
      {badge && (
        <Badge className="absolute top-4 right-4" variant="secondary">
          {badge}
        </Badge>
      )}
      
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {action && (
          <Button 
            className="w-full" 
            asChild={!!action.href}
            onClick={action.onClick}
          >
            {action.href ? (
              <a href={action.href}>{action.label}</a>
            ) : (
              action.label
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Usage
<FeatureCard
  title="Authentication"
  description="Secure user authentication with multiple providers"
  icon={<Shield className="h-6 w-6 text-primary" />}
  badge="Popular"
  features={[
    "Email & password authentication",
    "OAuth with GitHub, Google, Discord",
    "Email verification",
    "Password reset functionality"
  ]}
  action={{
    label: "Learn More",
    href: "/docs/auth"
  }}
/>
```

### Stats Dashboard

```typescript
// src/components/stats-dashboard.tsx
export function StatsDashboard() {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+12%" },
    { label: "Revenue", value: "$45,231", change: "+8%" },
    { label: "Orders", value: "1,234", change: "+23%" },
    { label: "Conversion", value: "3.2%", change: "-2%" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.label}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.change.startsWith('+') 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

---

## 🎨 Theming Components

### Component Styling

```typescript
// Custom styling with theme variables
<Button 
  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
>
  Gradient Button
</Button>

// Using CSS variables
<Card 
  className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5"
>
  Themed Card
</Card>

// Dark mode responsive
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
  Content
</div>
```

### Creating Custom Variants

```typescript
// src/components/ui/custom-button.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const customButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        gradient: "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20",
        neon: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {}

export function CustomButton({ 
  className, 
  variant, 
  size, 
  ...props 
}: CustomButtonProps) {
  return (
    <button
      className={cn(customButtonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

## 📱 Responsive Design

### Mobile-First Components

```typescript
// Responsive card grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cards.map((card) => (
    <Card key={card.id} className="w-full">
      <CardContent className="p-4 sm:p-6">
        {card.content}
      </CardContent>
    </Card>
  ))}
</div>

// Responsive navigation
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <h1 className="text-2xl font-bold">Dashboard</h1>
  <div className="flex flex-col sm:flex-row gap-2">
    <Button variant="outline">Export</Button>
    <Button>Create New</Button>
  </div>
</div>

// Mobile drawer vs desktop dropdown
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon">
        <Menu className="h-4 w-4" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <NavigationItems />
    </SheetContent>
  </Sheet>
</div>

<div className="hidden md:block">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <NavigationItems />
    </DropdownMenuContent>
  </DropdownMenu>
</div>
```

---

## ♿ Accessibility

### ARIA Integration

```typescript
// Components automatically include ARIA attributes
<Button 
  aria-label="Close dialog"
  aria-describedby="dialog-description"
>
  <X className="h-4 w-4" />
</Button>

// Form accessibility
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email Address</FormLabel>
      <FormControl>
        <Input 
          type="email"
          aria-describedby="email-error"
          aria-invalid={!!form.formState.errors.email}
          {...field} 
        />
      </FormControl>
      <FormDescription id="email-description">
        We'll never share your email with anyone else.
      </FormDescription>
      <FormMessage id="email-error" />
    </FormItem>
  )}
/>

// Keyboard navigation
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="outline"
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          // Focus first menu item
        }
      }}
    >
      Options
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => console.log('Selected')}>
      Option 1
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 📋 Component Best Practices

### Performance Optimization

```typescript
// Lazy load heavy components
const HeavyChart = lazy(() => import('@/components/heavy-chart'))

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}

// Memoize expensive components
const ExpensiveComponent = memo(function ExpensiveComponent({ 
  data 
}: { 
  data: ComplexData 
}) {
  const processedData = useMemo(() => {
    return processComplexData(data)
  }, [data])

  return <Card>{/* Render processed data */}</Card>
})
```

### Error Boundaries

```typescript
// Component error boundary
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            This component encountered an error. Please refresh the page.
          </AlertDescription>
        </Alert>
      )
    }

    return this.props.children
  }
}
```

### Testing Components

```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('supports disabled state', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

---

**Build beautiful interfaces!** 🧩

---

*Need help? Check out our [Theme Guide](THEMES.md) or [Configuration Guide](CONFIG.md)*