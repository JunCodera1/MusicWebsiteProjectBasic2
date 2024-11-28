// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "@/assets/images/dashboards/usa.png";
// Custom components
import MiniCalendar from "@/adminComponents/calendar/MiniCalendar";
import MiniStatistics from "@/adminComponents/card/MiniStatistics";
import IconBox from "@/adminComponents/icons/IconBox";
import React from "react";
import {
  MdMusicNote,
  MdAttachMoney,
  MdBarChart,
  MdPlaylistAdd,
} from "react-icons/md";
import CheckTable from "@/views/admin/default/components/CheckTable";
import ComplexTable from "@/views/admin/default/components/ComplexTable";
import DailyTraffic from "@/views/admin/default/components/DailyTraffic";
import PieCard from "@/views/admin/default/components/PieCard";
import Tasks from "@/views/admin/default/components/Tasks";
import TotalSpent from "@/views/admin/default/components/TotalSpent";
import WeeklyRevenue from "@/views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "@/views/admin/default/variables/columnsData";
import tableDataCheck from "@/views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "@/views/admin/default/variables/tableDataComplex.json";

export default function MusicAdminDashboard() {
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
        {/* Số lượng bài hát */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdMusicNote} color={brandColor} />
              }
            />
          }
          name="Số lượng bài hát"
          value="5000"
        />

        {/* Doanh thu từ thanh toán */}
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
          name="Doanh thu từ thanh toán"
          value="$1245.67"
        />

        {/* Số lượng danh sách phát */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdPlaylistAdd} color={brandColor} />
              }
            />
          }
          name="Số lượng danh sách phát"
          value="345"
        />

        {/* Thống kê doanh thu */}
        <MiniStatistics growth="+15%" name="Doanh thu hàng tuần" value="$500" />

        {/* Tổng số người dùng */}
        <MiniStatistics
          startContent={<Flex me="-16px" mt="10px"></Flex>}
          name="Tổng số người dùng"
          value="10234"
        />
      </SimpleGrid>

      {/* Biểu đồ doanh thu và chi tiêu */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>

      {/* Quản lý bài hát và thông tin người dùng */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>

      {/* Quản lý album và nhiệm vụ */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
