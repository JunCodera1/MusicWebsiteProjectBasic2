import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react"
import { ArrowLeft, ArrowRight, Play, Search, Settings } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import p1 from "../assets/Pictures/708a320ec3182cd3a629e98808e73fb5_2744128242798474951-removebg-preview.png"



const menuItemsLeft = [
  { label: "Home", uri: "/" },
  { label: "Feed", uri: "/feed" },
  { label: "Trending", uri: "/trending" },
  { label: "Upload", uri: "/upload" },
];

const menuItemsRight = [{ label: "Login", uri: "/login" }];



// Sample song ranking data
const rankingData = [
  { time: "15:00", song1: 80, song2: 40, song3: 30 },
  { time: "17:00", song1: 75, song2: 45, song3: 35 },
  { time: "19:00", song1: 70, song2: 42, song3: 32 },
  { time: "21:00", song1: 65, song2: 38, song3: 28 },
  { time: "23:00", song1: 72, song2: 40, song3: 30 },
  { time: "01:00", song1: 85, song2: 45, song3: 35 },
  { time: "03:00", song1: 95, song2: 50, song3: 40 },
  { time: "05:00", song1: 90, song2: 48, song3: 38 },
  { time: "07:00", song1: 85, song2: 46, song3: 36 },
  { time: "09:00", song1: 88, song2: 47, song3: 37 },
  { time: "11:00", song1: 82, song2: 44, song3: 34 },
  { time: "13:00", song1: 85, song2: 45, song3: 35 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-[#34224F] p-3 shadow-lg border border-white/10">
        <div className="flex items-center gap-2">
          <img
            src={'p1'}
            alt="Song thumbnail"
            className="w-10 h-10 rounded"
          />
          <div>
            <p className="font-medium text-white">
              {payload[0].value}%
            </p>
            <p className="text-sm text-gray-400">
              {label}
            </p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function TrendingPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index)
  }

  return (
    <div className="min-h-screen bg-[#170f23] text-white">
      {/* Navigation Bar */}
      {/* <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 bg-[#2f2739] border-none"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>
        <Button className="bg-[#9b4de0] hover:bg-[#9b4de0]/90">Nâng cấp tài khoản</Button>
        <Button variant="outline" className="gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21 17H3V5h18m0-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2" />
          </svg>
          Tải bản Windows
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div> */}
      <Navbar
        menuItemsLeft={menuItemsLeft}
        menuItemsRight={menuItemsRight}
      ></Navbar>

      {/* Chart Section */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">SoundBox</h1>
          <Button size="icon" className="rounded-full bg-[#9b4de0] hover:bg-[#9b4de0]/90">
            <Play className="h-4 w-4" />
          </Button>
        </div>

        {/* Chart */}
        <Card className="w-full bg-[#2f2739]/50 mb-8">
          <CardContent className="p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={rankingData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  onMouseLeave={() => setActiveIndex(0)}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide={true} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="linear"
                    dataKey="song1"
                    stroke="hsl(217, 91%, 60%)"
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, index } = props
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={index === activeIndex ? 6 : 4}
                          stroke="hsl(217, 91%, 60%)"
                          strokeWidth={2}
                          fill="#170f23"
                        />
                      )
                    }}
                    activeDot={false}
                    onMouseEnter={handleMouseEnter}
                  />
                  <Line
                    type="monotone"
                    dataKey="song2"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="song3"
                    stroke="hsl(0, 84%, 60%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Song List */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <Card key={index} className="bg-[#2f2739]/50 hover:bg-[#2f2739]">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-gray-400 w-8">{index}</span>
                  <div className="w-10 h-10">
                    <img
                      src="/placeholder.svg"
                      alt="Song thumbnail"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Song Title {index}</h3>
                    <p className="text-sm text-gray-400">Artist Name</p>
                  </div>
                  <span className="text-sm text-gray-400">03:45</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Rankings */}
      <div className="p-8 bg-[#2f2739]/30">
        <h2 className="text-2xl font-bold mb-6">Bảng Xếp Hạng Tuần</h2>
        <div className="grid grid-cols-3 gap-6">
          {['Việt Nam', 'US-UK', 'K-Pop'].map((region) => (
            <Card key={region} className="bg-[#2f2739]/50">
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-4">{region}</h3>
                <Table>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((rank) => (
                      <TableRow key={rank}>
                        <TableCell className="font-medium">{rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src="/placeholder.svg"
                              alt="Song thumbnail"
                              className="w-10 h-10 rounded"
                            />
                            <div>
                              <div className="font-medium">Song Title {rank}</div>
                              <div className="text-sm text-gray-400">Artist Name</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">03:45</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="ghost" className="w-full mt-4">
                  Xem tất cả
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

