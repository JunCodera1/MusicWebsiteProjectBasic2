import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Info, BookHeart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";

interface InterpretationResult {
  lyrics: string;
  name: string;
  style: string;
  techniques: string;
  speed_suggestion: string;

}

interface Interpretation {
  process: string;
  result?: InterpretationResult;
}

interface ResultItemProps {
  emoji: string;
  title: string;
  content: string;
  delay: number;
}
function stringToInterpretation(text: string): Interpretation | undefined {
  if (!text) return undefined;

  try {
    // Tìm và trích xuất phần JSON từ chuỗi text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return undefined;

    const result = JSON.parse(jsonMatch[0]);

    return {
      process: result.lyrics || "",
      result: {
        lyrics: result.name || "",
        style: result.style || "",
        techniques: result.techniques || "",
        speed_suggestion: result.speed_suggestion || "",
        name: result.extended_lyrics || "",
      }
    };
  } catch (e) {
    console.error("Failed to parse interpretation:", e);
    return undefined;
  }
}

function formatConfidenceLevel(level: string) {
  if (level === "low") return "⬇️ Thấp";
  if (level === "medium") return "➡️ Trung bình";
  if (level === "high") return "⬆️ Cao";
  return `❓ ${level}`;
}

const ResultItem = ({ emoji, title, content, delay }: ResultItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="mb-2 flex items-start space-x-2 "
  >
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="mr-1 font-semibold">
          {emoji} {title}
        </span>
        {content}
      </p>
    </div>
  </motion.div>
);

export default function CommunicationInterpreter() {
  const [context, setContext] = useState<string>("");

  const {
    completion,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    api: "/api/completion",
    body: {
      context,
    },
  });

  const interpretation = stringToInterpretation(completion);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mx-auto w-full max-w-6xl bg-[#1a1f25] shadow-lg border-[#2a2f35]">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center justify-center gap-2 text-center text-2xl font-bold text-white">
            <MessageCircle className="h-6 w-6 text-[#4fd1c5]" />
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Trợ lý sáng tác nhạc của bạn
            </motion.span>
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-400">
            Không cần phải hiểu hết tâm tư, chỉ cần để trợ lý viết nhạc của chúng tôi giúp bạn kể câu chuyện qua giai điệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="context"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Bạn muốn sáng tác về chủ đề gì?
              </label>
              <Textarea
                id="context"
                placeholder="Nhập chủ đề, cảm xúc hoặc ý tưởng của bạn..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 "
                rows={2}
              />
            </div>
            <div>
              <label
                htmlFor="statement"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Mô tả chi tiết hơn để trợ lý có thể giúp bạn:?
              </label>
              <Textarea
                id="statement"
                placeholder="Thể loại nhạc, tốc độ, phong cách, cấu trúc bài hát..." // Rap style, beat tempo, special requirements about flow or wordplay"
                value={input}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-[#4fd1c5] text-white hover:bg-[#45b8b0]"
                disabled={isLoading || input.length === 0}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Trợ lý AI của bạn đang Cook...
                  </>
                ) : (
                  <>
                    <BookHeart className="mr-2 h-4 w-4" />
                    Bắt đầu sáng tác nhạc !
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="  bg-[#4fd1c5] text-white hover:bg-[#45b8b0]"
                onClick={() => {
                  setInput("");
                  setContext("");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>

        {error && (
          <CardContent>
            <p className="text-red-500">{error.message}</p>
          </CardContent>
        )}

        <AnimatePresence>
          {interpretation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardFooter className="flex flex-col space-y-4">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-2 rounded-lg bg-white p-4 shadow dark:bg-gray-700"
                  >
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                      <Info className="h-5 w-5 text-blue-500" />
                      Thành Phẩm
                    </h3>
                    <ReactMarkdown className="prose prose-sm max-w-none">
                      {interpretation.process}
                    </ReactMarkdown>
                  </motion.div>

                  {interpretation.result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-lg bg-white p-4 shadow dark:bg-gray-700"
                    >
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <BookHeart className="h-5 w-5 text-green-500" />
                        Chi tiết
                      </h3>
                      <ResultItem
                        emoji="📝"
                        title="Tên Bài Hát:"
                        content={interpretation.result.lyrics}
                        delay={0.6}
                      />
                      <ResultItem
                        emoji="💭"
                        title="Thể Loại:"
                        content={interpretation.result.style}
                        delay={0.7}
                      />
                      <ResultItem
                        emoji="💡"
                        title="Ý Tưởng:"
                        content={interpretation.result.techniques}
                        delay={0.8}
                      />

                      {/* <ResultItem
                        emoji="❓"
                        title="Giải thích thêm:"
                        content={interpretation.result.name}
                        delay={0.9}
                      /> */}
                      <ResultItem
                        emoji="📊"
                        title="Lời Bình Luận:"
                        content={formatConfidenceLevel(
                          "Tác phẩm sáng tạo của bạn"
                        )}
                        delay={1}
                      />
                    </motion.div>
                  )}
                </div>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
