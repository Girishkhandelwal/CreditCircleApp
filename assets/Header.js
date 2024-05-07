import * as React from 'react';
import Svg, { ClipPath, G, Defs, Path, Rect, Circle, FeFlood, Filter, FeBlend, FeComposite, FeColorMatrix, FeGaussianBlur, FeOffset } from 'react-native-svg';

export function MenuIcon(props) {
    return (

        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <G id="Frame">
                <G id="Group">
                    <Path id="Vector" d="M19.875 8.375H4.125C3.4875 8.375 3 7.8875 3 7.25C3 6.6125 3.4875 6.125 4.125 6.125H19.875C20.5125 6.125 21 6.6125 21 7.25C21 7.8875 20.5125 8.375 19.875 8.375ZM19.875 13.625H4.125C3.4875 13.625 3 13.1375 3 12.5C3 11.8625 3.4875 11.375 4.125 11.375H19.875C20.5125 11.375 21 11.8625 21 12.5C21 13.1375 20.5125 13.625 19.875 13.625ZM19.875 18.875H4.125C3.4875 18.875 3 18.3875 3 17.75C3 17.1125 3.4875 16.625 4.125 16.625H19.875C20.5125 16.625 21 17.1125 21 17.75C21 18.3875 20.5125 18.875 19.875 18.875Z" fill="white" />
                </G>
            </G>
        </Svg>

    );
}


export function NotificationIcon(props) {
    return (

        <Svg fill="#000000" width="24" height="25"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 611.999 611.999" space="preserve" {...props}>
            <G>
                <G>
                    <G>
                        <Path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203
				C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578
				c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626
				h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856
				c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626
				C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32
				c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082
				c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z
				 M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826
				c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485
				c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z" fill={'white'}/>
                        <Path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258
				c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258
				C323.259,126.96,315.532,119.235,306.001,119.235z" fill={'white'}/>
                    </G>
                </G>
            </G>
        </Svg>

    );
}


export function BackIcon(props) {
    return (

        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}> 
        <Path d="M15.5 19L8.5 12L15.5 5" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>

    );
}


export function DotsIcon(props) {
    return (

        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <G id="fo-more-fill">
        <Path id="Vector" d="M3.14537 10.2669C3.36954 10.0275 3.64325 9.84003 3.94738 9.71742C4.25151 9.59482 4.57874 9.54007 4.90622 9.557C5.22538 9.55394 5.54172 9.61708 5.83526 9.74243C6.1288 9.86778 6.39317 10.0526 6.61169 10.2853C6.84436 10.5038 7.0292 10.7682 7.15455 11.0617C7.2799 11.3553 7.34303 11.6716 7.33996 11.9908C7.34497 12.3143 7.28284 12.6354 7.15749 12.9337C7.03214 13.2321 6.8463 13.5011 6.61169 13.724C6.3914 13.9537 6.12649 14.136 5.83321 14.2596C5.53993 14.3833 5.22448 14.4457 4.90622 14.443C4.59076 14.4508 4.27688 14.3962 3.9826 14.2822C3.68833 14.1683 3.41946 13.9974 3.19146 13.7793C2.95787 13.5458 2.77569 13.2662 2.65662 12.9581C2.53754 12.6501 2.48421 12.3206 2.50004 11.9908C2.48365 11.3542 2.71502 10.7362 3.14537 10.2669ZM9.59392 11.9908C9.58974 12.3126 9.65045 12.6319 9.77241 12.9296C9.89438 13.2274 10.0751 13.4976 10.3038 13.724C10.5239 13.9514 10.7875 14.1323 11.0789 14.2558C11.3703 14.3793 11.6836 14.443 12.0001 14.443C12.3166 14.443 12.6298 14.3793 12.9213 14.2558C13.2127 14.1323 13.4762 13.9514 13.6963 13.724C13.925 13.4976 14.1057 13.2274 14.2277 12.9296C14.3496 12.6319 14.4103 12.3126 14.4062 11.9908C14.4085 11.6734 14.3468 11.3588 14.2248 11.0658C14.1029 10.7728 13.9231 10.5073 13.6963 10.2853C13.4778 10.0552 13.2147 9.87196 12.9231 9.74676C12.6315 9.62156 12.3174 9.55699 12.0001 9.55699C11.6827 9.55699 11.3687 9.62156 11.0771 9.74676C10.7854 9.87196 10.5224 10.0552 10.3038 10.2853C10.077 10.5073 9.89722 10.7728 9.77526 11.0658C9.6533 11.3588 9.59162 11.6734 9.59392 11.9908ZM16.6233 11.9908C16.624 12.6377 16.8801 13.2583 17.3358 13.7174C17.7915 14.1766 18.4101 14.4374 19.057 14.443C19.3788 14.4435 19.6974 14.3803 19.9946 14.2571C20.2919 14.134 20.5618 13.9532 20.7888 13.7253C21.0159 13.4974 21.1957 13.2268 21.3177 12.9291C21.4398 12.6314 21.5017 12.3125 21.5 11.9908C21.5018 11.5083 21.3595 11.0362 21.0915 10.6349C20.8234 10.2337 20.4418 9.9215 19.9953 9.73836C19.5489 9.55523 19.0579 9.50944 18.5853 9.60687C18.1127 9.70429 17.6799 9.9405 17.3423 10.2853C17.1126 10.5055 16.9303 10.7705 16.8066 11.0638C16.683 11.357 16.6206 11.6725 16.6233 11.9908Z" fill="black"/>
        </G>
        </Svg>
        

    );
}





