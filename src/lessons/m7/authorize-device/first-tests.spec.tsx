import { fireEvent, render, waitFor } from "@testing-library/react";

import { AuthorizeDeviceProcessUnion as AuthorizeDeviceProcess } from "lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessUnion";

import { AuthorizeDevicePO } from "./first.po";

jest.mock("../../../api/token", () => ({
  getTokenInstruction: async () => ({
    instruction: "Wpisz hasło SMS",
    tokenId: "1111-2222-3333-4444",
  }),
  sendTokenCode: async (params: { tokenCode: string }) => {
    if (params.tokenCode.length !== 4) {
      throw new Error(`Invalid confirmation token!`);
    }
  },
}));

describe("AuthorizeDevice", () => {
  it("should allow once after the user passes the correct password", async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render();

    // when
    authorizeDevicePO.clickChooseAllowOnceButton();

    // then
    await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki");

    // when
    authorizeDevicePO.submitAllowOnceToken("pass");

    // then
    await authorizeDevicePO.expectLoaderDisappeared();

    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1);
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled();
  });
});

//test piece during lesson
// file: ui/authorize-device/views/AuthorizeDeviceAllowOnceTokenView.tsx
describe("AuthorizeDeviceLesson", () => {
  it("sshould allow once after the user passes the correct password", async () => {
    // given
    const onSuccess = jest.fn();
    const onLogout = jest.fn();
    const { getByTestId, findByText, queryByTestId } = render(
      <AuthorizeDeviceProcess onSuccess={onSuccess} onLogout={onLogout} />
    );
    //when
    const btnChooseAllowOnce = getByTestId("btn-choose-allow-once");
    fireEvent.click(btnChooseAllowOnce);
    // then
    await findByText("Jednorazowy wjazd do apki");
    // when
    const inputEl = getByTestId("input-allow-one-password");
    fireEvent.change(inputEl, { target: { value: "pass" } });
    const btnTokenSubmit = getByTestId("btn-token-submit");
    fireEvent.click(btnTokenSubmit);

    // then
    await waitFor(() => {
      // await loader dissapears
      expect(queryByTestId("img-loader")).not.toBeInTheDocument();
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onLogout).not.toHaveBeenCalled();
  });
});
