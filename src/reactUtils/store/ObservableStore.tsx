// https://github.com/burtonator/polar-bookshelf/blob/5dad87ab61aaf377defb803a18c8aa77df0a3ae6/web/js/react/store/ObservableStore.tsx

import {Subject} from "rxjs";
import React, {useContext, useState} from "react";
import {Provider} from "polar-shared/src/util/Providers";
import { Equals } from "./Equals";
import { typeMemo } from '../hooks/ReactHooks';


