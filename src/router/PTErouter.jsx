import PTEExamLayout from "@/layout/PTE/PTEExamLayout";
import SpeakingWritingPTELayout from "@/layout/PTE/SpeakingWritingPTELayout";
import PTEHeadSetCheck from "@/pages/ptePage/PTEHeadSetCheck";
import PTEKeyboardCheck from "@/pages/ptePage/PTEKeyboardCheck";
import PTEMicrophoneCheck from "@/pages/ptePage/PTEMicrophoneCheck";
import PTEDescribeImage from "@/pages/ptePage/speakingWritting/PTEDescribeImage";
import PTEGroupDiscussion from "@/pages/ptePage/speakingWritting/PTEGroupDiscussion";
import PTEPersonalInterdiction from "@/pages/ptePage/speakingWritting/PTEPersonalInterdiction";
import PTEReadAloud from "@/pages/ptePage/speakingWritting/PTEReadAloud";
import PTERepeatSentence from "@/pages/ptePage/speakingWritting/PTERepeatSentence";
import PTERespondSituation from "@/pages/ptePage/speakingWritting/PTERespondSituation";
import PTERetellLecture from "@/pages/ptePage/speakingWritting/PTERetellLecture";
import PTEShortQuestion from "@/pages/ptePage/speakingWritting/PTEShortQuestion";
import PTESummarize from "@/pages/ptePage/speakingWritting/PTESummarize";
import PTEStartTest from "@/pages/ptePage/speakingWritting/PTEStartTest";
import PTESylluabusSW from "@/pages/ptePage/speakingWritting/PTESylluabusSW";
import PTEResult from "@/pages/ptePage/speakingWritting/PTEResult";

export const pteRoutes = {
    path: "/pte",
    element: <SpeakingWritingPTELayout />,
    children: [

        {
            path: "headset-check",
            element: <PTEHeadSetCheck />,
        },
        {
            path: "microphone-check",
            element: <PTEMicrophoneCheck />
        },
        {
            path: "keyboard-check",
            element: <PTEKeyboardCheck />
        },
        {
            path: "syllubus",
            element: <PTESylluabusSW />
        },
        {
            path: "test-start",
            element: <PTEStartTest />
        },
        {
            path: "result",
            element: <PTEResult />
        }
    ]
}

export const pteExaminationRoutes = {
    path: "pte-examination",
    element: <PTEExamLayout />,
    children: [
        {
            index: true,
            element: <PTEPersonalInterdiction />
        },
        {
            path: "read-aloud",
            element: <PTEReadAloud />
        },
        {
            path: "repeat-sentence",
            element: <PTERepeatSentence />
        },
        {
            path: "describe-image",
            element: <PTEDescribeImage />
        },
        {
            path: "retell-lecture",
            element: <PTERetellLecture />
        },
        {
            path: "short-question",
            element: <PTEShortQuestion />
        },
        {
            path: "group-discussion",
            element: <PTEGroupDiscussion />
        },
        {
            path: "respond-situation",
            element: <PTERespondSituation />
        },
        {
            path: "summarize-written-text",
            element: <PTESummarize />
        },

    ]
}   