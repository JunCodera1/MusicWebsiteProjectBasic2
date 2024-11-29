import {
  Box,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import {
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdAddTask,
} from "react-icons/md";
import MiniStatistics from "@/adminComponents/card/MiniStatistics";
import IconBox from "@/adminComponents/icons/IconBox";
import DailyTraffic from "@/views/admin/default/components/DailyTraffic";
import PieCard from "@/views/admin/default/components/PieCard";
import TotalSpent from "@/views/admin/default/components/TotalSpent";
import WeeklyRevenue from "@/views/admin/default/components/WeeklyRevenue";
import CheckTable from "@/views/admin/default/components/CheckTable";
import ComplexTable from "@/views/admin/default/components/ComplexTable";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "@/views/admin/default/variables/columnsData";
import tableDataCheck from "@/views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "@/views/admin/default/variables/tableDataComplex.json";

export default function MusicDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Tổng lượt phát"
          value="1,245,000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Doanh thu tháng này"
          value="$12,000"
        />
        <MiniStatistics growth="+23%" name="Bài hát mới" value="150" />
        <MiniStatistics
          endContent={<Flex me="-16px" mt="10px"></Flex>}
          name="Số dư tài khoản"
          value="$1,000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Công việc mới"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Tổng số album"
          value="430"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}
