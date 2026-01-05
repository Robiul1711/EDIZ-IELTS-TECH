import logo from '@/assets/images/Navlogo.png';
import I from '@/assets/images/I.png';
import P from '@/assets/images/P.png';
import C from '@/assets/images/C.png';
import banner from '@/assets/images/banner3.png';
import newStudents from '@/assets/images/newstudents.png';
import speaking from '@/assets/images/speaking.png';
import writing from '@/assets/images/writing.png';
import mock from '@/assets/images/mock.png';
import reading from '@/assets/images/reading.png';
import listening from '@/assets/images/listening.png';
import howitwork from '@/assets/images/howitwork.png';
import Full from '@/assets/images/Full.png';
import R from '@/assets/images/R.png';
import S from '@/assets/images/S.png';
import W from '@/assets/images/W.png';
import L from '@/assets/images/L.png';
import SpeakingWritingPTELayout from '@/layout/PTE/SpeakingWritingPTELayout';

export const ImageAssets = {
    logo,
    I,
    P,
    C,
    banner,
    newStudents,
    speaking,
    writing,
    mock,
    reading,
    listening,
    howitwork,
    Full,
    R,
    S,
    W,
    L
}

export const pteRoutes = {
    path: "/pte",
    element: <SpeakingWritingPTELayout />,
    children: [
        {
            index: true,
            element: <h1>Welcome to PTE Section</h1>,
        },
        {
            path: "speaking-writing",
            element: <h1>PTE Speaking and Writing Main Page</h1>,
        }
    ]
}