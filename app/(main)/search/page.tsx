"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Star, MapPin, SlidersHorizontal } from "lucide-react"

interface Clinic {
  id: string
  name: string
  specialty: string[]
  location: string
  rating: number
  reviews: number
  image: string
  distance: number
  featured: boolean
  lat?: number
  lng?: number
}

// Mock data with coordinates
const clinics: Clinic[] = [
  {
    id: "1",
    name: "Phòng Khám Sức Khỏe Gia Đình",
    specialty: ["Khám Tổng Quát", "Nha Khoa"],
    location: "Quận 1, TP HCM",
    rating: 4.8,
    reviews: 234,
    image: "/clinic-interior-modern-healthcare.jpg",
    distance: 2.3,
    featured: true,
    lat: 10.7769,
    lng: 106.6966,
  },
  {
    id: "2",
    name: "Bệnh Viện Đa Khoa Tây Sài Gòn",
    specialty: ["Tim Mạch", "Ngoại Khoa"],
    location: "Quận 7, TP HCM",
    rating: 4.7,
    reviews: 456,
    image: "/hospital-building-architecture.jpg",
    distance: 5.1,
    featured: true,
    lat: 10.7282,
    lng: 106.7192,
  },
  {
    id: "3",
    name: "Phòng Khám Chuyên Khoa Mắt",
    specialty: ["Mắt"],
    location: "Quận 3, TP HCM",
    rating: 4.6,
    reviews: 189,
    image: "/modern-clinic-reception-area.jpg",
    distance: 3.8,
    featured: false,
    lat: 10.7932,
    lng: 106.6714,
  },
  {
    id: "4",
    name: "Phòng Khám Nhi Đông",
    specialty: ["Nhi"],
    location: "Quận 5, TP HCM",
    rating: 4.9,
    reviews: 312,
    image: "/pediatric-clinic-friendly-design.jpg",
    distance: 4.2,
    featured: false,
    lat: 10.762,
    lng: 106.6619,
  },
]

const specialties = ["Khám Tổng Quát", "Nha Khoa", "Tim Mạch", "Ngoại Khoa", "Mắt", "Nhi"]
const areas = ["Quận 1", "Quận 3", "Quận 5", "Quận 7"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const nearbyParam = searchParams.get("nearby")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [maxDistance, setMaxDistance] = useState(100)
  const [isNearby, setIsNearby] = useState(nearbyParam === "true")
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    if (isNearby && navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoading(false)
        },
        () => {
          setIsLoading(false)
          alert("Không thể lấy vị trí của bạn. Vui lòng kiểm tra quyền truy cập vị trí.")
        },
      )
      console.log(userLocation)
    }
  }, [isNearby])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const filteredClinics = clinics
    .map((clinic) => {
      if (isNearby && userLocation && clinic.lat && clinic.lng) {
        const calculatedDistance = calculateDistance(userLocation.lat, userLocation.lng, clinic.lat, clinic.lng)
        return { ...clinic, distance: Number.parseFloat(calculatedDistance.toFixed(1)) }
      }
      return clinic
    })
    .filter((clinic) => {
      const matchesSearch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty =
        selectedSpecialties.length === 0 || selectedSpecialties.some((spec) => clinic.specialty.includes(spec))
      const matchesArea = selectedAreas.length === 0 || selectedAreas.some((area) => clinic.location.includes(area))
      const matchesRating = clinic.rating >= minRating
      const matchesDistance = clinic.distance <= maxDistance

      return matchesSearch && matchesSpecialty && matchesArea && matchesRating && matchesDistance
    })
    .sort((a, b) => a.distance - b.distance)

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]))
  }

  // Component for Filter Content (reusable in both sidebar and sheet)
  const FilterContent = () => {
    return (
      <div className="space-y-6">
      {/* Distance Filter */}
      <div className="bg-card rounded-lg p-4 border border-border shadow">
        <h3 className="font-bold mb-4 text-foreground">Khoảng Cách</h3>
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Tối đa {maxDistance} km</label>
          <input
            type="range"
            min="1"
            max="50"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-card rounded-lg p-4 border border-border shadow">
        <h3 className="font-bold mb-4 text-foreground">Đánh Giá</h3>
        <div className="space-y-3">
          {[4, 4.5, 4.7].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={minRating === rating}
                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
              />
              <span className="text-sm flex items-center gap-1 text-foreground">
                {rating}+ <Star className="w-4 h-4 fill-accent text-accent" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="bg-card rounded-lg p-4 border border-border shadow">
        <h3 className="font-bold mb-4 text-foreground">Chuyên Khoa</h3>
        <div className="space-y-3">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <span className="text-sm text-foreground">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Area Filter */}
      <div className="bg-card rounded-lg p-4 border border-border shadow">
        <h3 className="font-bold mb-4 text-foreground">Khu Vực</h3>
        <div className="space-y-3">
          {areas.map((area) => (
            <label key={area} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={selectedAreas.includes(area)} onCheckedChange={() => toggleArea(area)} />
              <span className="text-sm text-foreground">{area}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-background pb-20 lg:pb-0">
        {/* Search Bar */}
        <div className="bg-secondary/30 border-b border-border py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-3 sm:space-y-4">
              <Input
                type="text"
                placeholder="Tìm kiếm phòng khám..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
              />
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant={isNearby ? "default" : "outline"}
                  onClick={() => setIsNearby(!isNearby)}
                  className="flex-1 sm:flex-none text-xs sm:text-sm h-9 sm:h-10"
                  size="sm"
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  {isLoading ? "Đang lấy vị trị..." : isNearby ? "Đang xem gần nhất" : "Tìm Gần Nhất"}
                </Button>

                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex-1 sm:flex-none text-xs sm:text-sm h-9 sm:h-10" size="sm">
                      <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Bộ Lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] sm:w-[400px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Bộ Lọc Tìm Kiếm</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block lg:col-span-1">
                <FilterContent />
              </aside>

              {/* Clinic Results */}
              <div className="lg:col-span-3">
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Tìm thấy {filteredClinics.length} phòng khám
                  </p>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {filteredClinics.map((clinic) => (
                    <Link key={clinic.id} href={`/clinic/${clinic.id}`}>
                      <Card className="overflow-hidden shadow transition-shadow hover:shadow-md cursor-pointer h-full">
                        <div className="flex flex-col sm:flex-row h-full">
                          {/* Image */}
                          <div className="w-full sm:w-40 md:w-48 h-40 sm:h-auto bg-secondary/20 flex items-center justify-center flex-shrink-0">
                            <img
                              src={clinic.image || "/placeholder.svg"}
                              alt={clinic.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2 line-clamp-2">
                                    {clinic.name}
                                  </h3>
                                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                    {clinic.specialty.map((spec) => (
                                      <span
                                        key={spec}
                                        className="text-[10px] sm:text-xs bg-primary/10 text-primary px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                                      >
                                        {spec}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {clinic.featured && (
                                  <span className="text-[10px] sm:text-xs font-bold bg-accent/20 text-accent px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap flex-shrink-0">
                                    Nổi Bật
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="line-clamp-1">
                                    {clinic.location} ({clinic.distance} km)
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent flex-shrink-0" />
                                  <span>
                                    {clinic.rating} ({clinic.reviews} đánh giá)
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="default"
                              className="mt-3 sm:mt-4 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
                              onClick={(e) => {
                                e.preventDefault()
                              }}
                            >
                              Đặt Lịch
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}

                  {filteredClinics.length === 0 && (
                    <Card className="p-6 sm:p-8 text-center">
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Không tìm thấy phòng khám phù hợp
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

