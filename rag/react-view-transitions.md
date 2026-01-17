<div class="test" id="page-text-result">React
v19.2<br><br>Search⌘CtrlK<br><br>Learn
Reference
Community
Blog<br><br>react@19.2
Overview <br><br>Hooks <br><br>useActionState 
useCallback 
useContext 
useDebugValue 
useDeferredValue 
useEffect 
useEffectEvent 
useId 
useImperativeHandle 
useInsertionEffect 
useLayoutEffect 
useMemo 
useOptimistic 
useReducer 
useRef 
useState 
useSyncExternalStore 
useTransition <br><br>Components <br><br>&lt;Fragment&gt; (&lt;&gt;) 
&lt;Profiler&gt; 
&lt;StrictMode&gt; 
&lt;Suspense&gt; 
&lt;Activity&gt; 
&lt;ViewTransition&gt; - This feature is available in the latest Canary version of React<br><br>APIs <br><br>act 
addTransitionType - This feature is available in the latest Canary version of React<br><br>cache 
cacheSignal 
captureOwnerStack 
createContext 
lazy 
memo 
startTransition 
use 
experimental_taintObjectReference - This feature is available in the latest Experimental version of React<br><br>experimental_taintUniqueValue - This feature is available in the latest Experimental version of React<br><br>react-dom@19.2<br><br>Hooks 
useFormStatus <br><br>Components <br><br>Common (e.g. &lt;div&gt;) 
&lt;form&gt; 
&lt;input&gt; 
&lt;option&gt; 
&lt;progress&gt; 
&lt;select&gt; 
&lt;textarea&gt; 
&lt;link&gt; 
&lt;meta&gt; 
&lt;script&gt; 
&lt;style&gt; 
&lt;title&gt; <br><br>APIs <br><br>createPortal 
flushSync 
preconnect 
prefetchDNS 
preinit 
preinitModule 
preload 
preloadModule <br><br>Client APIs <br><br>createRoot 
hydrateRoot <br><br>Server APIs <br><br>renderToPipeableStream 
renderToReadableStream 
renderToStaticMarkup 
renderToString 
resume 
resumeToPipeableStream <br><br>Static APIs <br><br>prerender 
prerenderToNodeStream 
resumeAndPrerender 
resumeAndPrerenderToNodeStream <br><br>React Compiler<br><br>Configuration <br><br>compilationMode 
gating 
logger 
panicThreshold 
target <br><br>Directives <br><br>"use memo" 
"use no memo" <br><br>Compiling Libraries 
React DevTools
React Performance tracks 
eslint-plugin-react-hooks<br><br>Lints <br><br>exhaustive-deps 
rules-of-hooks 
component-hook-factories 
config 
error-boundaries 
gating 
globals 
immutability 
incompatible-library 
preserve-manual-memoization 
purity 
refs 
set-state-in-effect 
set-state-in-render 
static-components 
unsupported-syntax 
use-memo <br><br>Rules of React<br><br>Overview <br><br>Components and Hooks must be pure 
React calls Components and Hooks 
Rules of Hooks <br><br>React Server Components
Server Components 
Server Functions <br><br>Directives <br><br>'use client' 
'use server' <br><br>Legacy APIs<br><br>Legacy React APIs <br><br>Children 
cloneElement 
Component 
createElement 
createRef 
forwardRef 
isValidElement 
PureComponent <br><br>Is this page useful?<br><br>API Reference<br><br>Components<br><br>&lt;ViewTransition&gt; - This feature is available in the latest Canary version of React<br><br>Canary<br><br>The &lt;ViewTransition /&gt; API is currently only available in React’s Canary and Experimental channels.
Learn more about React’s release channels here.<br><br>&lt;ViewTransition&gt; lets you animate elements that update inside a Transition.<br><br>import {ViewTransition} from 'react';<br><br>&lt;ViewTransition&gt;<br><br> &lt;div&gt;...&lt;/div&gt;<br><br>&lt;/ViewTransition&gt;<br><br>Reference 
&lt;ViewTransition&gt; 
View Transition Class 
Styling View Transitions <br><br>Usage 
Animating an element on enter/exit 
Animating a shared element 
Animating reorder of items in a list 
Animating from Suspense content 
Opting-out of an animation 
Customizing animations 
Customizing animations with types 
Building View Transition enabled routers <br><br>Troubleshooting 
My &lt;ViewTransition&gt; is not activating 
I’m getting an error “There are two &lt;ViewTransition name=%s&gt; components with the same name mounted at the same time.” <br><br>Reference <br><br>&lt;ViewTransition&gt; <br><br>Wrap elements in &lt;ViewTransition&gt; to animate them when they update inside a Transition. React uses the following heuristics to determine if a View Transition activates for an animation:<br><br>enter: If a ViewTransition itself gets inserted in this Transition, then this will activate.<br><br>exit: If a ViewTransition itself gets deleted in this Transition, then this will activate.<br><br>update: If a ViewTransition has any DOM mutations inside it that React is doing (such as a prop changing) or if the ViewTransition boundary itself changes size or position due to an immediate sibling. If there are nested ViewTransition then the mutation applies to them and not the parent.<br><br>share: If a named ViewTransition is inside a deleted subtree and another named ViewTransition with the same name is part of an inserted subtree in the same Transition, they form a Shared Element Transition, and it animates from the deleted one to the inserted one.<br><br>By default, &lt;ViewTransition&gt; animates with a smooth cross-fade (the browser default view transition). You can customize the animation by providing a View Transition Class to the &lt;ViewTransition&gt; component. You can customize animations for each kind of trigger (see Styling View Transitions).<br><br>Deep Dive
How does &lt;ViewTransition&gt; work? <br><br>Show Details
Under the hood, React applies view-transition-name to inline styles of the nearest DOM node nested inside the &lt;ViewTransition&gt; component. If there are multiple sibling DOM nodes like &lt;ViewTransition&gt;&lt;div /&gt;&lt;div /&gt;&lt;/ViewTransition&gt; then React adds a suffix to the name to make each unique but conceptually they’re part of the same one. React doesn’t apply these eagerly but only at the time that boundary should participate in an animation.
React automatically calls startViewTransition itself behind the scenes so you should never do that yourself. In fact, if you have something else on the page running a ViewTransition React will interrupt it. So it’s recommended that you use React itself to coordinate these. If you had other ways of trigger ViewTransitions in the past, we recommend that you migrate to the built-in way.
If there are other React ViewTransitions already running then React will wait for them to finish before starting the next one. However, importantly if there are multiple updates happening while the first one is running, those will all be batched into one. If you start A-&gt;B. Then in the meantime you get an update to go to C and then D. When the first A-&gt;B animation finishes the next one will animate from B-&gt;D.
The getSnapshotBeforeUpdate life-cycle will be called before startViewTransition and some view-transition-name will update at the same time.
Then React calls startViewTransition. Inside the updateCallback, React will:<br><br>Apply its mutations to the DOM and invoke useInsertionEffects.
Wait for fonts to load.
Call componentDidMount, componentDidUpdate, useLayoutEffect and refs.
Wait for any pending Navigation to finish.
Then React will measure any changes to the layout to see which boundaries will need to animate.<br><br>After the ready Promise of the startViewTransition is resolved, React will then revert the view-transition-name. Then React will invoke the onEnter, onExit, onUpdate and onShare callbacks to allow for manual programmatic control over the Animations. This will be after the built-in default ones have already been computed.
If a flushSync happens to get in the middle of this sequence, then React will skip the Transition since it relies on being able to complete synchronously.
After the finished Promise of the startViewTransition is resolved, React will then invoke useEffect. This prevents those from interfering with the performance of the Animation. However, this is not a guarantee because if another setState happens while the Animation is running it’ll still have to invoke the useEffect earlier to preserve the sequential guarantees.<br><br>Props <br><br>By default, &lt;ViewTransition&gt; animates with a smooth cross-fade. You can customize the animation, or specify a shared element transition, with these props:<br><br>optional enter: A string or object. The View Transition Class to apply when enter is activated.<br><br>optional exit: A string or object. The View Transition Class to apply when exit is activated.<br><br>optional update: A string or object. The View Transition Class to apply when an update is activated.<br><br>optional share: A string or object. The View Transition Class to apply when a shared element is activated.<br><br>optional default: A string or object. The View Transition Class used when no other matching activation prop is found.<br><br>optional name: A string or object. The name of the View Transition used for shared element transitions. If not provided, React will use a unique name for each View Transition to prevent unexpected animations.<br><br>Callback <br><br>These callbacks allow you to adjust the animation imperatively using the animate APIs:<br><br>optional onEnter: A function. React calls onEnter after an “enter” animation.<br><br>optional onExit: A function. React calls onExit after an “exit” animation.<br><br>optional onShare: A function. React calls onShare after a “share” animation.<br><br>optional onUpdate: A function. React calls onUpdate after an “update” animation.<br><br>Each callback receives as arguments:<br><br>element: The DOM element that was animated.<br><br>types: The Transition Types included in the animation.<br><br>View Transition Class <br><br>The View Transition Class is the CSS class name(s) applied by React during the transition when the ViewTransition activates. It can be a string or an object.<br><br>string: the class added on the child elements when activated. If 'none' is provided, no class will be added.<br><br>object: the class added on the child elements will be the key matching View Transition type added with addTransitionType. The object can also specify a default to use if no matching type is found.<br><br>The value 'none' can be used to prevent a View Transition from activating for a specific trigger.
Styling View Transitions <br><br>Note
In many early examples of View Transitions around the web, you’ll have seen using a view-transition-name and then style it using ::view-transition-...(my-name) selectors. We don’t recommend that for styling. Instead, we normally recommend using a View Transition Class instead.<br><br>To customize the animation for a &lt;ViewTransition&gt; you can provide a View Transition Class to one of the activation props. The View Transition Class is a CSS class name that React applies to the child elements when the ViewTransition activates.
For example, to customize an “enter” animation, provide a class name to the enter prop:<br><br>&lt;ViewTransition enter="slide-in"&gt;<br><br>When the &lt;ViewTransition&gt; activates an “enter” animation, React will add the class name slide-in. Then you can refer to this class using view transition pseudo selectors to build reusable animations:
::view-transition-group(.slide-in) {<br><br>}<br><br>::view-transition-old(.slide-in) {<br><br>}<br><br>::view-transition-new(.slide-in) {<br><br>}<br><br>In the future, CSS libraries may add built-in animations using View Transition Classes to make this easier to use.
Caveats <br><br>By default, setState updates immediately and does not activate &lt;ViewTransition&gt;, only updates wrapped in a Transition. You can also use &lt;Suspense&gt; to opt-in to a Transition to reveal content.<br><br>&lt;ViewTransition&gt; creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece. However, it can also lose continuity in things that should be moving by themselves. So you might have to add more &lt;ViewTransition&gt; boundaries manually as a result.
Many users may prefer not having animations on the page. React doesn’t automatically disable animations for this case. We recommend that using the @media (prefers-reduced-motion) media query to disable animations or tone them down based on user preference. In the future, CSS libraries may have this built-in to their presets.
Currently, &lt;ViewTransition&gt; only works in the DOM. We’re working on adding support for React Native and other platforms.<br><br>Usage <br><br>Animating an element on enter/exit <br><br>Enter/Exit Transitions trigger when a &lt;ViewTransition&gt; is added or removed by a component in a transition:<br><br>function Child() {<br><br> return (<br><br> &lt;ViewTransition&gt;<br><br> &lt;div&gt;Hi&lt;/div&gt;<br><br> &lt;/ViewTransition&gt;<br><br> );<br><br>}<br><br>function Parent() {<br><br> const [show, setShow] = useState();<br><br> if (show) {<br><br> return &lt;Child /&gt;;<br><br> }<br><br> return null;<br><br>}<br><br>When setShow is called, show switches to true and the Child component is rendered. When setShow is called inside startTransition, and Child renders a ViewTransition before any other DOM nodes, an enter animation is triggered.
When show switches back to false, an exit animation is triggered.<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"<br><br>function Item() {
 return (
 &lt;ViewTransition&gt;
 &lt;Video video={videos[0]}/&gt;
 &lt;/ViewTransition&gt;
 );
}<br><br>export default function Component() {
 const [showItem, setShowItem] = useState(false);
 return (
 &lt;&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;{showItem ? '➖' : '➕'}&lt;/button&gt;<br><br> {showItem ? &lt;Item /&gt; : null}
 &lt;/&gt;
 );
}<br><br>Show more<br><br>Pitfall<br><br>&lt;ViewTransition&gt; only activates if it is placed before any DOM node. If Child instead looked like this, no animation would trigger:<br><br>function Component() {<br><br> return &lt;ViewTransition&gt;Hi&lt;/ViewTransition&gt;;<br><br>}<br><br>Animating a shared element <br><br>Normally, we don’t recommend assigning a name to a &lt;ViewTransition&gt; and instead let React assign it an automatic name. The reason you might want to assign a name is to animate between completely different components when one tree unmounts and another tree mounts at the same time. To preserve continuity.<br><br>&lt;ViewTransition name={UNIQUE_NAME}&gt;<br><br> &lt;Child /&gt;<br><br>&lt;/ViewTransition&gt;<br><br>When one tree unmounts and another mounts, if there’s a pair where the same name exists in the unmounting tree and the mounting tree, they trigger the “share” animation on both. It animates from the unmounting side to the mounting side.
Unlike an exit/enter animation this can be deeply inside the deleted/mounted tree. If a &lt;ViewTransition&gt; would also be eligible for exit/enter, then the “share” animation takes precedence.
If Transition first unmounts one side and then leads to a &lt;Suspense&gt; fallback being shown before eventually the new name being mounted, then no shared element transition happens.<br><br>App.jsVideo.js<br><br>App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from "react";
import {Video, Thumbnail, FullscreenVideo} from "./Video";
import videos from "./data";<br><br>export default function Component() {
 const [fullscreen, setFullscreen] = useState(false);
 if (fullscreen) {
 return &lt;FullscreenVideo
 video={videos[0]}
 onExit={() =&gt; startTransition(() =&gt; setFullscreen(false))}
 /&gt;
 }
 return &lt;Video
 video={videos[0]}
 onClick={() =&gt; startTransition(() =&gt; setFullscreen(true))}
 /&gt;
}<br><br>Show more<br><br>Note<br><br>If either the mounted or unmounted side of a pair is outside the viewport, then no pair is formed. This ensures that it doesn’t fly in or out of the viewport when something is scrolled. Instead it’s treated as a regular enter/exit by itself.
This does not happen if the same Component instance changes position, which triggers an “update”. Those animate regardless if one position is outside the viewport.
There’s currently a quirk where if a deeply nested unmounted &lt;ViewTransition&gt; is inside the viewport but the mounted side is not within the viewport, then the unmounted side animates as its own “exit” animation even if it’s deeply nested instead of as part of the parent animation.<br><br>Pitfall<br><br>It’s important that there’s only one thing with the same name mounted at a time in the entire app. Therefore it’s important to use unique namespaces for the name to avoid conflicts. To ensure you can do this you might want to add a constant in a separate module that you import.<br><br>export const MY_NAME = "my-globally-unique-name";<br><br>import {MY_NAME} from './shared-name';<br><br>...<br><br>&lt;ViewTransition name={MY_NAME}&gt;<br><br>Animating reorder of items in a list <br><br>items.map(item =&gt; &lt;Component key={item.id} item={item} /&gt;)<br><br>When reordering a list, without updating the content, the “update” animation triggers on each &lt;ViewTransition&gt; in the list if they’re outside a DOM node. Similar to enter/exit animations.
This means that this will trigger the animation on this &lt;ViewTransition&gt;:<br><br>function Component() {<br><br> return &lt;ViewTransition&gt;&lt;div&gt;...&lt;/div&gt;&lt;/ViewTransition&gt;;<br><br>}<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";<br><br>export default function Component() {
 const [orderedVideos, setOrderedVideos] = useState(videos);
 const reorder = () =&gt; {
 startTransition(() =&gt; {
 setOrderedVideos((prev) =&gt; {
 return [...prev.sort(() =&gt; Math.random() - 0.5)];
 });
 });
 };
 return (
 &lt;&gt;
 &lt;button onClick={reorder}&gt;🎲&lt;/button&gt;
 &lt;div className="listContainer"&gt;
 {orderedVideos.map((video, i) =&gt; {
 return (
 &lt;ViewTransition key={video.title}&gt;
 &lt;Video video={video} /&gt;
 &lt;/ViewTransition&gt;
 );
 })}
 &lt;/div&gt;
 &lt;/&gt;
 );
}<br><br>Show more<br><br>However, this wouldn’t animate each individual item:<br><br>function Component() {<br><br> return &lt;div&gt;&lt;ViewTransition&gt;...&lt;/ViewTransition&gt;&lt;/div&gt;;<br><br>}<br><br>Instead, any parent &lt;ViewTransition&gt; would cross-fade. If there is no parent &lt;ViewTransition&gt; then there’s no animation in that case.<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";<br><br>export default function Component() {
 const [orderedVideos, setOrderedVideos] = useState(videos);
 const reorder = () =&gt; {
 startTransition(() =&gt; {
 setOrderedVideos((prev) =&gt; {
 return [...prev.sort(() =&gt; Math.random() - 0.5)];
 });
 });
 };
 return (
 &lt;&gt;
 &lt;button onClick={reorder}&gt;🎲&lt;/button&gt;
 &lt;ViewTransition&gt;
 &lt;div className="listContainer"&gt;
 {orderedVideos.map((video, i) =&gt; {
 return &lt;Video video={video} key={video.title} /&gt;;
 })}
 &lt;/div&gt;
 &lt;/ViewTransition&gt;
 &lt;/&gt;
 );
}<br><br>Show more<br><br>This means you might want to avoid wrapper elements in lists where you want to allow the Component to control its own reorder animation:<br><br>items.map(item =&gt; &lt;div&gt;&lt;Component key={item.id} item={item} /&gt;&lt;/div&gt;)<br><br>The above rule also applies if one of the items updates to resize, which then causes the siblings to resize, it’ll also animate its sibling &lt;ViewTransition&gt; but only if they’re immediate siblings.
This means that during an update, which causes a lot of re-layout, it doesn’t individually animate every &lt;ViewTransition&gt; on the page. That would lead to a lot of noisy animations which distracts from the actual change. Therefore React is more conservative about when an individual animation triggers.<br><br>Pitfall
It’s important to properly use keys to preserve identity when reordering lists. It might seem like you could use “name”, shared element transitions, to animate reorders but that would not trigger if one side was outside the viewport. To animate a reorder you often want to show that it went to a position outside the viewport.<br><br>Animating from Suspense content <br><br>Just like any Transition, React waits for data and new CSS (&lt;link rel="stylesheet" precedence="..."&gt;) before running the animation. In addition to this, ViewTransitions also wait up to 500ms for new fonts to load before starting the animation to avoid them flickering in later. For the same reason, an image wrapped in ViewTransition will wait for the image to load.
If it’s inside a new Suspense boundary instance, then the fallback is shown first. After the Suspense boundary fully loads, it triggers the &lt;ViewTransition&gt; to animate the reveal to the content.
Currently, this only happens for client-side Transition. In the future, this will also animate Suspense boundary for streaming SSR when content from the server suspends during the initial load.
There are two ways to animate Suspense boundaries depending on where you place the &lt;ViewTransition&gt;:
Update:<br><br>&lt;ViewTransition&gt;<br><br> &lt;Suspense fallback={&lt;A /&gt;}&gt;<br><br> &lt;B /&gt;<br><br> &lt;/Suspense&gt;<br><br>&lt;/ViewTransition&gt;<br><br>In this scenario when the content goes from A to B, it’ll be treated as an “update” and apply that class if appropriate. Both A and B will get the same view-transition-name and therefore they’re acting as a cross-fade by default.<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition,
 Suspense
} from 'react';
import {Video, VideoPlaceholder} from "./Video";
import {useLazyVideoData} from "./data"<br><br>function LazyVideo() {
 const video = useLazyVideoData();
 return (
 &lt;Video video={video}/&gt;
 );
}<br><br>export default function Component() {
 const [showItem, setShowItem] = useState(false);
 return (
 &lt;&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;{showItem ? '➖' : '➕'}&lt;/button&gt;
 {showItem ? (
 &lt;ViewTransition&gt;
 &lt;Suspense fallback={&lt;VideoPlaceholder /&gt;}&gt;
 &lt;LazyVideo /&gt;
 &lt;/Suspense&gt;
 &lt;/ViewTransition&gt;
 ) : null}
 &lt;/&gt;
 );
}<br><br>Show more<br><br>Enter/Exit:<br><br>&lt;Suspense fallback={&lt;ViewTransition&gt;&lt;A /&gt;&lt;/ViewTransition&gt;}&gt;<br><br> &lt;ViewTransition&gt;&lt;B /&gt;&lt;/ViewTransition&gt;<br><br>&lt;/Suspense&gt;<br><br>In this scenario, these are two separate ViewTransition instances each with their own view-transition-name. This will be treated as an “exit” of the &lt;A&gt; and an “enter” of the &lt;B&gt;.
You can achieve different effects depending on where you choose to place the &lt;ViewTransition&gt; boundary.<br><br>Opting-out of an animation <br><br>Sometimes you’re wrapping a large existing component, like a whole page, and you want to animate some updates, such as changing the theme. However, you don’t want it to opt-in all updates inside the whole page to cross-fade when they’re updating. Especially if you’re incrementally adding more animations.
You can use the class “none” to opt-out of an animation. By wrapping your children in a “none” you can disable animations for updates to them while the parent still triggers.<br><br>&lt;ViewTransition&gt;<br><br> &lt;div className={theme}&gt;<br><br> &lt;ViewTransition update="none"&gt;<br><br> {children}<br><br> &lt;/ViewTransition&gt;<br><br> &lt;/div&gt;<br><br>&lt;/ViewTransition&gt;<br><br>This will only animate if the theme changes and not if only the children update. The children can still opt-in again with their own &lt;ViewTransition&gt; but at least it’s manual again.<br><br>Customizing animations <br><br>By default, &lt;ViewTransition&gt; includes the default cross-fade from the browser.
To customize animations, you can provide props to the &lt;ViewTransition&gt; component to specify which animations to use, based on how the &lt;ViewTransition&gt; activates.
For example, we can slow down the default cross fade animation:<br><br>&lt;ViewTransition default="slow-fade"&gt;<br><br> &lt;Video /&gt;<br><br>&lt;/ViewTransition&gt;<br><br>And define slow-fade in CSS using view transition classes:
::view-transition-old(.slow-fade) {<br><br> animation-duration: 500ms;<br><br>}<br><br>::view-transition-new(.slow-fade) {<br><br> animation-duration: 500ms;<br><br>}<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"<br><br>function Item() {
 return (
 &lt;ViewTransition default="slow-fade"&gt;
 &lt;Video video={videos[0]}/&gt;
 &lt;/ViewTransition&gt;
 );
}<br><br>export default function Component() {
 const [showItem, setShowItem] = useState(false);
 return (
 &lt;&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;{showItem ? '➖' : '➕'}&lt;/button&gt;<br><br> {showItem ? &lt;Item /&gt; : null}
 &lt;/&gt;
 );
}<br><br>Show more<br><br>In addition to setting the default, you can also provide configurations for enter, exit, update, and share animations.<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 useState,
 startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"<br><br>function Item() {
 return (
 &lt;ViewTransition enter="slide-in" exit="slide-out"&gt;
 &lt;Video video={videos[0]}/&gt;
 &lt;/ViewTransition&gt;
 );
}<br><br>export default function Component() {
 const [showItem, setShowItem] = useState(false);
 return (
 &lt;&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;{showItem ? '➖' : '➕'}&lt;/button&gt;<br><br> {showItem ? &lt;Item /&gt; : null}
 &lt;/&gt;
 );
}<br><br>Show more<br><br>Customizing animations with types <br><br>You can use the addTransitionType API to add a class name to the child elements when a specific transition type is activated for a specific activation trigger. This allows you to customize the animation for each type of transition.
For example, to customize the animation for all forward and backward navigations:<br><br>&lt;ViewTransition default={{<br><br> 'navigation-back': 'slide-right',<br><br> 'navigation-forward': 'slide-left',<br><br> }}&gt;<br><br> &lt;div&gt;...&lt;/div&gt;<br><br>&lt;/ViewTransition&gt;<br><br>// in your router:<br><br>startTransition(() =&gt; {<br><br> addTransitionType('navigation-' + navigationType);<br><br>});<br><br>When the ViewTransition activates a “navigation-back” animation, React will add the class name “slide-right”. When the ViewTransition activates a “navigation-forward” animation, React will add the class name “slide-left”.
In the future, routers and other libraries may add support for standard view-transition types and styles.<br><br>App.js
App.js<br><br>ReloadClearFork<br><br>import {
 ViewTransition,
 addTransitionType,
 useState,
 startTransition,
} from "react";
import {Video} from "./Video";
import videos from "./data"<br><br>function Item() {
 return (
 &lt;ViewTransition enter={
 {
 "add-video-back": "slide-in-back",
 "add-video-forward": "slide-in-forward"
 }
 }
 exit={
 {
 "remove-video-back": "slide-in-forward",
 "remove-video-forward": "slide-in-back"
 }
 }&gt;
 &lt;Video video={videos[0]}/&gt;
 &lt;/ViewTransition&gt;
 );
}<br><br>export default function Component() {
 const [showItem, setShowItem] = useState(false);
 return (
 &lt;&gt;
 &lt;div className="button-container"&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 if (showItem) {
 addTransitionType("remove-video-back")
 } else {
 addTransitionType("add-video-back")
 }
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;⬅️&lt;/button&gt;
 &lt;button
 onClick={() =&gt; {
 startTransition(() =&gt; {
 if (showItem) {
 addTransitionType("remove-video-forward")
 } else {
 addTransitionType("add-video-forward")
 }
 setShowItem((prev) =&gt; !prev);
 });
 }}
 &gt;➡️&lt;/button&gt;
 &lt;/div&gt;
 {showItem ? &lt;Item /&gt; : null}
 &lt;/&gt;
 );
}<br><br>Show more<br><br>Building View Transition enabled routers <br><br>React waits for any pending Navigation to finish to ensure that scroll restoration happens within the animation. If the Navigation is blocked on React, your router must unblock in useLayoutEffect since useEffect would lead to a deadlock.
If a startTransition is started from the legacy popstate event, such as during a “back”-navigation then it must finish synchronously to ensure scroll and form restoration works correctly. This is in conflict with running a View Transition animation. Therefore, React will skip animations from popstate. Therefore animations won’t run for the back button. You can fix this by upgrading your router to use the Navigation API.<br><br>Troubleshooting <br><br>My &lt;ViewTransition&gt; is not activating <br><br>&lt;ViewTransition&gt; only activates if it is placed before any DOM node:<br><br>function Component() {<br><br> return (<br><br> &lt;div&gt;<br><br> &lt;ViewTransition&gt;Hi&lt;/ViewTransition&gt;<br><br> &lt;/div&gt;<br><br> );<br><br>}<br><br>To fix, ensure that the &lt;ViewTransition&gt; comes before any other DOM nodes:<br><br>function Component() {<br><br> return (<br><br> &lt;ViewTransition&gt;<br><br> &lt;div&gt;Hi&lt;/div&gt;<br><br> &lt;/ViewTransition&gt;<br><br> );<br><br>}<br><br>I’m getting an error “There are two &lt;ViewTransition name=%s&gt; components with the same name mounted at the same time.” <br><br>This error occurs when two &lt;ViewTransition&gt; components with the same name are mounted at the same time:<br><br>function Item() {<br><br> // 🚩 All items will get the same "name".<br><br> return &lt;ViewTransition name="item"&gt;...&lt;/ViewTransition&gt;;<br><br>}<br><br>function ItemList({items}) {<br><br> return (<br><br> &lt;&gt;<br><br> {item.map(item =&gt; &lt;Item key={item.id} /&gt;)}<br><br> &lt;/&gt;<br><br> );<br><br>}<br><br>This will cause the View Transition to error. In development, React detects this issue to surface it and logs two errors:<br><br>Console<br><br>There are two &lt;ViewTransition name=%s&gt; components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.
 at Item
 at ItemList<br><br>The existing &lt;ViewTransition name=%s&gt; duplicate has this stack trace.
 at Item
 at ItemList<br><br>To fix, ensure that there’s only one &lt;ViewTransition&gt; with the same name mounted at a time in the entire app by ensuring the name is unique, or adding an id to the name:<br><br>function Item({id}) {<br><br> // ✅ All items will get the same "name".<br><br> return &lt;ViewTransition name={`item-${id}`}&gt;...&lt;/ViewTransition&gt;;<br><br>}<br><br>function ItemList({items}) {<br><br> return (<br><br> &lt;&gt;<br><br> {item.map(item =&gt; &lt;Item key={item.id} item={item} /&gt;)}<br><br> &lt;/&gt;<br><br> );<br><br>}<br><br>Previous&lt;Activity&gt;<br><br>NextAPIs<br><br>Copyright © Meta Platforms, Inc
no uwu plz
uwu?
Logo by@sawaratsuki1004<br><br>Learn React
Quick Start
Installation
Describing the UI
Adding Interactivity
Managing State
Escape Hatches<br><br>API Reference
React APIs
React DOM APIs<br><br>Community
Code of Conduct
Meet the Team
Docs Contributors
Acknowledgements<br><br>More
Blog
React Native
Privacy
Terms<br><br>On this page<br><br>Overview
Reference 
&lt;ViewTransition&gt; 
View Transition Class 
Styling View Transitions 
Usage 
Animating an element on enter/exit 
Animating a shared element 
Animating reorder of items in a list 
Animating from Suspense content 
Opting-out of an animation 
Customizing animations 
Customizing animations with types 
Building View Transition enabled routers 
Troubleshooting 
My &lt;ViewTransition&gt; is not activating 
I’m getting an error “There are two &lt;ViewTransition name=%s&gt; components with the same name mounted at the same time.”</div>