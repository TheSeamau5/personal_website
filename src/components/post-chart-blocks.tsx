import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

const engagementData = [
  { week: "Week 1", engagement: 12100, engagementLabel: "12.1k" },
  { week: "Week 2", engagement: 13700, engagementLabel: "13.7k" },
  { week: "Week 3", engagement: 16900, engagementLabel: "16.9k" },
  { week: "Week 4", engagement: 20800, engagementLabel: "20.8k" },
  { week: "Week 5", engagement: 19400, engagementLabel: "19.4k" },
  { week: "Week 6", engagement: 24200, engagementLabel: "24.2k" },
  { week: "Week 7", engagement: 26100, engagementLabel: "26.1k" },
  { week: "Week 8", engagement: 30400, engagementLabel: "30.4k" },
  { week: "Week 9", engagement: 32000, engagementLabel: "32.0k" },
];

const engagementChartConfig = {
  engagement: {
    label: "Engagement",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const throughputData = [
  { day: "Mon", units: 44 },
  { day: "Tue", units: 66 },
  { day: "Wed", units: 88 },
  { day: "Thu", units: 130 },
  { day: "Fri", units: 108 },
  { day: "Sat", units: 76 },
];

const throughputChartConfig = {
  units: {
    label: "Units",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const trafficData = [
  { key: "direct", channel: "Direct", share: 62, fill: "#111111" },
  { key: "search", channel: "Search", share: 22, fill: "#6b7280" },
  { key: "referral", channel: "Referral", share: 16, fill: "#d4d4d8" },
];

const trafficChartConfig = {
  direct: {
    label: "Direct",
    color: "#111111",
  },
  search: {
    label: "Search",
    color: "#6b7280",
  },
  referral: {
    label: "Referral",
    color: "#d4d4d8",
  },
} satisfies ChartConfig;

const tableToggleButtonClass =
  "pointer-events-none absolute right-3 top-3 z-10 border border-black bg-white px-2.5 py-1 text-sm font-semibold opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 sm:right-4 sm:top-4";

const chartTooltipClass =
  "rounded-none border-black bg-white px-3 py-2 text-base shadow-none";
const chartCardTitleClass = "chart-card-title";
const chartCardSubtitleClass = "chart-card-subtitle";

function formatCompactNumber(value: number) {
  return `${(value / 1000).toFixed(1)}k`;
}

type FlipPanelProps = {
  showTable: boolean;
  front: ReactNode;
  back: ReactNode;
};

function FlipPanel({ showTable, front, back }: FlipPanelProps) {
  const faceStyle = {
    WebkitBackfaceVisibility: "hidden" as const,
    backfaceVisibility: "hidden" as const,
  };

  return (
    <div className="relative w-full" style={{ perspective: "1400px" }}>
      <div className="relative grid w-full grid-cols-[minmax(0,1fr)]">
        <div
          className={cn(
            "col-start-1 row-start-1 min-h-0 w-full overflow-hidden border border-black bg-white py-3 transition-[transform,opacity] duration-500 will-change-transform sm:py-4",
            showTable ? "pointer-events-none" : "pointer-events-auto",
          )}
          style={{
            ...faceStyle,
            WebkitTransformStyle: "preserve-3d",
            transformStyle: "preserve-3d",
            transform: showTable ? "rotateY(180deg)" : "rotateY(0deg)",
            opacity: showTable ? 0 : 1,
            zIndex: showTable ? 0 : 2,
          }}
        >
          {front}
        </div>
        <div
          className={cn(
            "col-start-1 row-start-1 min-h-0 w-full overflow-hidden border border-black bg-white py-3 transition-[transform,opacity] duration-500 will-change-transform sm:py-4",
            showTable ? "pointer-events-auto" : "pointer-events-none",
          )}
          style={{
            ...faceStyle,
            WebkitTransformStyle: "preserve-3d",
            transformStyle: "preserve-3d",
            transform: showTable ? "rotateY(0deg)" : "rotateY(-180deg)",
            opacity: showTable ? 1 : 0,
            zIndex: showTable ? 2 : 0,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

function renderActivePieShape(props: any) {
  return (
    <Sector
      {...props}
      outerRadius={(props.outerRadius ?? 86) + 8}
      stroke="#111"
      strokeWidth={1.5}
    />
  );
}

export function EngagementChartStack() {
  const [showEngagementTable, setShowEngagementTable] = useState(false);

  return (
    <div className="not-prose mt-10 grid gap-6 sm:mt-12 sm:gap-8">
      <Card className="group relative w-full border-0 bg-transparent p-0 shadow-none">
        <FlipPanel
          showTable={showEngagementTable}
          front={
            <>
              <button
                type="button"
                aria-pressed={showEngagementTable}
                aria-label="Show table"
                onClick={() => setShowEngagementTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Table
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Engagement Trend (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Weekly growth over nine weeks.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-68 sm:h-80">
                  <div className="flex h-full w-full items-center justify-center">
                    <ChartContainer
                      config={engagementChartConfig}
                      className="aspect-auto h-full w-full max-w-full"
                    >
                      <LineChart
                        accessibilityLayer
                        data={engagementData}
                        margin={{ left: 6, right: 6, top: 6, bottom: 6 }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="week"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value: string) =>
                            value.replace("Week ", "W")
                          }
                          interval="preserveStartEnd"
                          minTickGap={16}
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          width={48}
                          tickFormatter={(value: number) =>
                            formatCompactNumber(value)
                          }
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              className={chartTooltipClass}
                              labelClassName="text-base font-semibold"
                              formatter={(value) =>
                                formatCompactNumber(Number(value))
                              }
                            />
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="engagement"
                          stroke="var(--color-engagement)"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{
                            fill: "var(--color-engagement)",
                            r: 7,
                            stroke: "var(--foreground)",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </>
          }
          back={
            <>
              <button
                type="button"
                aria-pressed={showEngagementTable}
                aria-label="Show chart"
                onClick={() => setShowEngagementTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Chart
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Engagement Trend (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Weekly growth over nine weeks.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-68 overflow-hidden bg-white sm:h-80">
                  <div className="h-full overflow-auto pr-1 overscroll-contain">
                    <Table className="text-base">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-base font-semibold">
                            Week
                          </TableHead>
                          <TableHead className="text-base font-semibold">
                            Engagement
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {engagementData.map((row) => (
                          <TableRow key={row.week}>
                            <TableCell>{row.week}</TableCell>
                            <TableCell>{row.engagementLabel}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </>
          }
        />
      </Card>
    </div>
  );
}

export function ThroughputTrafficStack() {
  const [activeThroughputIndex, setActiveThroughputIndex] = useState<number>();
  const [showThroughputTable, setShowThroughputTable] = useState(false);

  const [activeTrafficIndex, setActiveTrafficIndex] = useState<number>();
  const [showTrafficTable, setShowTrafficTable] = useState(false);

  return (
    <div className="not-prose mt-10 grid gap-6 sm:mt-12 sm:gap-8">
      <Card className="group relative w-full border-0 bg-transparent p-0 shadow-none">
        <FlipPanel
          showTable={showThroughputTable}
          front={
            <>
              <button
                type="button"
                aria-pressed={showThroughputTable}
                aria-label="Show table"
                onClick={() => setShowThroughputTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Table
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Weekly Throughput (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Bar view of output by weekday.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-68 sm:h-80">
                  <div className="flex h-full w-full items-center justify-center">
                    <ChartContainer
                      config={throughputChartConfig}
                      className="aspect-auto h-full w-full max-w-full"
                    >
                      <BarChart
                        accessibilityLayer
                        data={throughputData}
                        margin={{ left: 6, right: 6, top: 6, bottom: 6 }}
                        onMouseMove={(state) => {
                          if (typeof state?.activeTooltipIndex === "number") {
                            setActiveThroughputIndex(state.activeTooltipIndex);
                          }
                        }}
                        onMouseLeave={() => setActiveThroughputIndex(undefined)}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={16}
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          width={36}
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              className={chartTooltipClass}
                              labelClassName="text-base font-semibold"
                            />
                          }
                        />
                        <Bar dataKey="units" radius={0}>
                          {throughputData.map((entry, index) => (
                            <Cell
                              key={entry.day}
                              fill={
                                activeThroughputIndex === index
                                  ? "var(--chart-1)"
                                  : "#6b7280"
                              }
                              stroke="#111"
                              strokeWidth={
                                activeThroughputIndex === index ? 1.5 : 1
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </>
          }
          back={
            <>
              <button
                type="button"
                aria-pressed={showThroughputTable}
                aria-label="Show chart"
                onClick={() => setShowThroughputTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Chart
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Weekly Throughput (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Bar view of output by weekday.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-68 overflow-hidden bg-white sm:h-80">
                  <div className="h-full overflow-auto pr-1 overscroll-contain">
                    <Table className="text-base">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-base font-semibold">
                            Day
                          </TableHead>
                          <TableHead className="text-base font-semibold">
                            Units
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {throughputData.map((row) => (
                          <TableRow key={row.day}>
                            <TableCell>{row.day}</TableCell>
                            <TableCell>{row.units}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </>
          }
        />
      </Card>

      <Card className="group relative w-full border-0 bg-transparent p-0 shadow-none">
        <FlipPanel
          showTable={showTrafficTable}
          front={
            <>
              <button
                type="button"
                aria-pressed={showTrafficTable}
                aria-label="Show table"
                onClick={() => setShowTrafficTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Table
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Traffic Mix (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Relative channel share.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-65 sm:h-75">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                    <ChartContainer
                      config={trafficChartConfig}
                      className="aspect-square h-39 w-39 min-h-0 sm:h-45 sm:w-45"
                    >
                      <PieChart accessibilityLayer>
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              className={chartTooltipClass}
                              labelClassName="text-base font-semibold"
                              labelKey="key"
                              nameKey="key"
                              formatter={(value) => `${value}%`}
                            />
                          }
                        />
                        <Pie
                          data={trafficData}
                          dataKey="share"
                          nameKey="key"
                          activeIndex={activeTrafficIndex ?? undefined}
                          activeShape={renderActivePieShape}
                          innerRadius={36}
                          outerRadius={72}
                          stroke="#111"
                          strokeWidth={1}
                          onMouseEnter={(_, index) =>
                            setActiveTrafficIndex(index)
                          }
                          onMouseLeave={() => setActiveTrafficIndex(undefined)}
                        >
                          {trafficData.map((entry, index) => (
                            <Cell
                              key={entry.key}
                              fill={
                                index === activeTrafficIndex
                                  ? "var(--chart-1)"
                                  : entry.fill
                              }
                              opacity={1}
                              stroke="#111"
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>

                    <div className="flex flex-wrap justify-center gap-3">
                      {trafficData.map((item, index) => {
                        const isActive = index === activeTrafficIndex;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActiveTrafficIndex(index)}
                            onMouseEnter={() => setActiveTrafficIndex(index)}
                            onFocus={() => setActiveTrafficIndex(index)}
                            className={cn(
                              "inline-flex items-center gap-2 border border-black px-3 py-2 text-base font-semibold transition",
                              isActive
                                ? "scale-105 bg-zinc-100 text-black"
                                : "bg-white text-black hover:bg-zinc-100",
                            )}
                          >
                            <span
                              className="inline-block h-3.5 w-3.5 border border-black"
                              style={{
                                backgroundColor: isActive
                                  ? "var(--chart-1)"
                                  : item.fill,
                              }}
                              aria-hidden="true"
                            />
                            <span>{item.channel}</span>
                            <span className="tabular-nums">{item.share}%</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          }
          back={
            <>
              <button
                type="button"
                aria-pressed={showTrafficTable}
                aria-label="Show chart"
                onClick={() => setShowTrafficTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Chart
              </button>
              <CardHeader className="px-3 sm:px-5">
                <CardTitle className={chartCardTitleClass}>
                  Traffic Mix (Mock)
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Relative channel share.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-5">
                <div className="h-65 overflow-hidden bg-white sm:h-75">
                  <div className="h-full overflow-auto pr-1 overscroll-contain">
                    <Table className="text-base">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-base font-semibold">
                            Channel
                          </TableHead>
                          <TableHead className="text-base font-semibold">
                            Share
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trafficData.map((row) => (
                          <TableRow key={row.key}>
                            <TableCell>{row.channel}</TableCell>
                            <TableCell>{row.share}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </>
          }
        />
      </Card>
    </div>
  );
}

export function ThroughputSnapshotCard() {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [showThroughputTable, setShowThroughputTable] = useState(false);

  return (
    <div className="not-prose">
      <Card className="group relative h-full w-full border-0 bg-transparent p-0 shadow-none">
        <FlipPanel
          showTable={showThroughputTable}
          front={
            <>
              <button
                type="button"
                aria-pressed={showThroughputTable}
                aria-label="Show table"
                onClick={() => setShowThroughputTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Table
              </button>
              <CardHeader className="px-3 sm:px-4">
                <CardTitle className={chartCardTitleClass}>
                  Throughput Snapshot
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Fast daily output check.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-4">
                <div className="h-68 sm:h-80">
                  <div className="h-full w-full">
                    <ChartContainer
                      config={throughputChartConfig}
                      className="aspect-auto h-full w-full max-w-full"
                    >
                      <BarChart
                        accessibilityLayer
                        data={throughputData}
                        margin={{ left: 6, right: 6, top: 6, bottom: 6 }}
                        onMouseMove={(state) => {
                          if (typeof state?.activeTooltipIndex === "number") {
                            setActiveIndex(state.activeTooltipIndex);
                          }
                        }}
                        onMouseLeave={() => setActiveIndex(undefined)}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          width={36}
                          tick={{ fontSize: 14, fill: "var(--foreground)" }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              className={chartTooltipClass}
                              labelClassName="text-base font-semibold"
                            />
                          }
                        />
                        <Bar dataKey="units" radius={0}>
                          {throughputData.map((entry, index) => (
                            <Cell
                              key={entry.day}
                              fill={
                                activeIndex === index
                                  ? "var(--chart-1)"
                                  : "#6b7280"
                              }
                              stroke="#111"
                              strokeWidth={activeIndex === index ? 1.5 : 1}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </>
          }
          back={
            <>
              <button
                type="button"
                aria-pressed={showThroughputTable}
                aria-label="Show chart"
                onClick={() => setShowThroughputTable((current) => !current)}
                className={tableToggleButtonClass}
              >
                Chart
              </button>
              <CardHeader className="px-3 sm:px-4">
                <CardTitle className={chartCardTitleClass}>
                  Throughput Snapshot
                </CardTitle>
                <CardDescription className={chartCardSubtitleClass}>
                  Fast daily output check.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-4">
                <div className="h-68 overflow-hidden bg-white sm:h-80">
                  <div className="h-full overflow-auto pr-1 overscroll-contain">
                    <Table className="text-base">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-base font-semibold">
                            Day
                          </TableHead>
                          <TableHead className="text-base font-semibold">
                            Units
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {throughputData.map((row) => (
                          <TableRow key={row.day}>
                            <TableCell>{row.day}</TableCell>
                            <TableCell>{row.units}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </>
          }
        />
      </Card>
    </div>
  );
}
