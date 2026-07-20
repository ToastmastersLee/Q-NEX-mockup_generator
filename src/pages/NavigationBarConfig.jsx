import { ToggleSwitch } from '../components/ToggleSwitch';
import { textSecondary, textTitle } from '../styles/theme';

export const NavigationBarConfig = ({ isDark, navConfig, setNavConfig, allNavItems }) => {
    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative animate-fade-in">
            <div className="max-w-5xl w-full mx-auto pb-10 flex flex-col gap-4">
                <div className="mb-2">
                    <h3 className={`text-base font-bold ${textTitle(isDark)}`}>Customize Navigation Bar Items</h3>
                    <p className={`text-xs mt-1 ${textSecondary(isDark)}`}>
                        Enable or disable menu items displayed in the bottom navigation bar.
                    </p>
                </div>

                {allNavItems.map((item) => {
                    const isChecked = !!navConfig[item.id];
                    return (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-5 rounded-2xl transition-all ${
                                isDark 
                                    ? 'bg-[#1e2736]/70 border border-slate-700/50 hover:bg-[#1e2736]' 
                                    : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                            }`}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className={`font-semibold text-sm ${textTitle(isDark)}`}>
                                        {item.label}
                                    </span>
                                    {item.isObsolete && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                            NMP211 Legacy
                                        </span>
                                    )}
                                </div>
                                {item.isObsolete && (
                                    <span className={`text-xs mt-1 ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>
                                        Audio Switch is for the legacy NMP211 model and hidden by default. Enable to show on bottom bar.
                                    </span>
                                )}
                            </div>

                            <ToggleSwitch
                                isChecked={isChecked}
                                onToggle={() => setNavConfig({ ...navConfig, [item.id]: !isChecked })}
                                isDark={isDark}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
