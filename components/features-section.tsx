import { Zap, Shield, Leaf, Award } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'High Protein',
    description: 'Up to 25g of premium protein per serving for maximum muscle recovery and growth.',
  },
  {
    icon: Shield,
    title: 'Lab Tested',
    description: 'Every batch is third-party tested for purity, potency, and banned substances.',
  },
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: 'No artificial colors, no fillers, no GMOs. Just pure, effective nutrition.',
  },
  {
    icon: Award,
    title: 'Athlete Approved',
    description: 'Trusted by 50,000+ athletes worldwide. NSF Certified for Sport.',
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-primary">
            Why Aevora
          </span>
          <h2 className="text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            THE AEVORA DIFFERENCE
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            We don&apos;t just make supplements. We engineer performance fuel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl bg-secondary p-8 transition-all duration-300 hover:bg-secondary/80"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
